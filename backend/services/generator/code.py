import random
import json
from datetime import datetime, timedelta
import os
import sys

sys.stdout.reconfigure(encoding='utf-8')
sys.stderr.reconfigure(encoding='utf-8')

class ProcessesProcessor:
    
    def __init__(self, app_data):
        self.app = app_data
        
    def get_animals(self):
        animals = []
        for values in self.app.get("livestock_table_data", []):
            animals.append({
                "id": values[0],
                "sex": values[1],
                "birth_date": values[2],
                "breed": values[3],
                "group": values[4]
            })
        return animals
    
    def get_available_animals(self):
        livestock = {}
        for values in self.app.get("livestock_table_data", []):
            inv = values[0]
            livestock[inv] = {"inv": inv, "group": values[4]}
        
        animals = []
        for values in self.app.get("ani_ost_table_data", []):
            inv = values[1]
            mass = int(values[4]) if values[4] and str(values[4]).isdigit() else 0
            
            if inv in livestock and mass > 0:
                animals.append({
                    "account": values[0],
                    "group": livestock[inv]["group"],
                    "inv": inv,
                    "warehouse": values[3],
                    "mass": mass
                })
        return animals
    
    def get_milk_animals(self):
        livestock = {}
        for values in self.app.get("livestock_table_data", []):
            inv = values[0]
            group = values[4]
            if group == "Дойная корова":
                livestock[inv] = {"inv": inv, "group": group}
        
        animals = []
        for values in self.app.get("ani_ost_table_data", []):
            inv = values[1]
            if inv in livestock:
                animals.append({
                    "account": values[0],
                    "group": livestock[inv]["group"],
                    "inv": inv,
                    "warehouse": values[3]
                })
        return animals
    
    def get_employees(self):
        employees = []
        emp_data = self.app.get("employee_table_data", [])
        dog_data = self.app.get("dog_emp_table_data", [])
        
        for emp_values, dog_values in zip(emp_data, dog_data):
            employees.append({
                "fio": emp_values[0],
                "work": dog_values[3],
                "department": dog_values[2],
                "salary": dog_values[4]
            })
        return employees
    
    def get_milk(self):
        milk = []
        for values in self.app.get("material_ost_table_data", []):
            if values[0] == "Товарное молоко":
                milk.append({
                    "qty": values[3],
                    "count": values[7]
                })
        return milk
    
    def get_tractors(self):
        """Получение тракторов"""
        tractors = []
        for values in self.app.get("machine_table_data", []):
            tractors.append({"name": values[0]})
        return tractors
    
    def get_fields(self):
        fields = []
        for values in self.app.get("posev_table_data", []):
            fields.append({
                "name": values[0],
                "area": values[5]
            })
        return fields
    
    def get_materials(self):
        materials = []
        for values in self.app.get("material_ost_table_data", []):
            materials.append({"name": values[0]})
        return materials
    
    def get_weight_by_status(self, status):
        if "Телки новорожденные" in status or "Бычок новорожденный" in status:
            return random.randint(25, 45)
        elif "Телки до 1 года" in status or "Бычок до 1 года" in status:
            return random.randint(80, 200)
        elif "Бычки старше 1 года" in status:
            return random.randint(350, 600)
        elif "Дойная корова" in status or "Сухостойная корова" in status:
            return random.randint(400, 700)
        elif "Нетели" in status:
            return random.randint(350, 550)
        return random.randint(100, 500)
    
    def process_buy_animal(self):
        data = []
        animal_data = self.app.get("animal_data", {}).get("card", [])
        
        for _ in range(random.randint(12, 20)):
            inv_number = f"КРС-{random.randint(100, 999)}"
            ani = random.choice(animal_data) if animal_data else {"status": "Корова"}
            weight = self.get_weight_by_status(ani.get("status", "Корова"))
            amount = weight * random.randint(200, 350)
            
            data.append({
                "Дата": self.generate_date(2025, 2026),
                "Подразделение": "Животноводческий комплекс",
                "Вид движения": "Оприходование",
                "Номенклатура (группа)": ani.get("status", "Корова"),
                "Количество голов": "1",
                "Инвентарный номер": inv_number,
                "Масса, кг": weight,
                "Цена, руб": amount
            })
        return data
    
    def process_birth(self):
        data = []
        animals = self.get_animals()
        employees = self.get_employees()
        
        mothers = [a for a in animals if "Дойная" in a.get("group", "")]
        workers = [e for e in employees if e["work"] in ["Доярка", "Скотник"]]
        
        if mothers and workers:
            for _ in range(random.randint(5, 12)):
                mother = random.choice(mothers)
                worker = random.choice(workers)
                inv_number = f"КРС-{random.randint(100, 999)}"
                product = random.choice(["Бычок новорожденный", "Телки новорожденные"])
                sex = "Бычок" if "Бычок" in product else "Телка"
                
                data.append({
                    "Дата": self.generate_date(2026, 2026),
                    "Счёт затрат": "20.01.02",
                    "Вид движения животных": "Приплод",
                    "Склад": "Коровник №5 (телята новорожденные)",
                    "Подразделение": "Животноводческий комплекс",
                    "Продукция": product,
                    "Инвентарный номер матери": mother["id"],
                    "Инвентарный номер": inv_number,
                    "Количество голов": "1",
                    "Масса, кг": random.randint(25, 45),
                    "Счёт учёта": "11.01",
                    "Пол": sex,
                    "Работник": worker["fio"]
                })
        return data
    
    def process_weight_gain(self):
        data = []
        animals = self.get_available_animals()
        
        if animals:
            count = min(len(animals), random.randint(5, 15))
            selected_animals = random.sample(animals, count)
            
            for animal in selected_animals:
                gain = random.randint(15, 80)
                old_mass = animal["mass"]
                new_mass = old_mass + gain
                
                data.append({
                    "Дата": self.generate_date(2026, 2026),
                    "Счёт затрат": "20.01.02",
                    "Подразделение": "Животноводческий комплекс",
                    "Вид движения животных": "Привес",
                    "Склад": animal["warehouse"],
                    "Инвентарный номер": animal["inv"],
                    "Количество голов": "1",
                    "Масса, кг": new_mass,
                    "Счёт учёта": animal["account"]
                })
        return data
    
    def process_transfer(self):
        data = []
        
        group_flow = {
            "Телки новорожденные": "Телки до 1 года",
            "Телки до 1 года": "Нетели (стельные)",
            "Нетели": "Коровы дойные",
            "Бычок новорожденный": "Бычки до 1 года",
            "Бычок до 1 года": "Бычки старше 1 года"
        }
        
        building_by_group = {
            "Телки до 1 года": ["Коровник №4"],
            "Нетели (стельные)": ["Коровник №2"],
            "Коровы дойные": ["Коровник №1"],
            "Бычки до 1 года": ["Коровник №3", "Коровник №4"],
            "Бычки старше 1 года": ["Коровник №3"]
        }
        
        animals = [a for a in self.get_available_animals() if a["group"] in group_flow]
        
        if animals:
            count = min(len(animals), random.randint(5, 15))
            selected_animals = random.sample(animals, count)
            
            for animal in selected_animals:
                old_group = animal["group"]
                new_group = group_flow.get(old_group, old_group)
                old_warehouse = animal["warehouse"]
                new_warehouse = random.choice(building_by_group.get(new_group, [old_warehouse]))
                
                data.append({
                    "Дата": self.generate_date(2026, 2026),
                    "Склад до": old_warehouse,
                    "Номенклатура отправитель": old_group,
                    "Вид движения животных": "Переведено из других групп (в другие группы)",
                    "Склад": new_warehouse,
                    "Подразделение": "Животноводческий комплекс",
                    "Инвентарный номер": animal["inv"],
                    "Номенклатура получатель": new_group,
                    "Количество голов": "1",
                    "Масса, кг": animal["mass"]
                })
        return data
    
    def process_milk_yield(self):
        data = []
        animals = self.get_milk_animals()
        
        for ani in animals:
            data.append({
                "Дата": self.generate_date(2026, 2026),
                "Счёт затрат": "20.01.02",
                "Склад": ani["warehouse"],
                "Количество доек": "1",
                "Продукция": "Молоко",
                "Инвентарный номер": ani["inv"],
                "Количество голов": "1",
                "Надоено молока за день, л": random.randint(20, 40)
            })
        return data
    
    def process_sale_products(self):
        milk_data = []
        ani_data = []
        
        milk = self.get_milk()
        for i, m in enumerate(milk, 1):
            qty = int(m["qty"]) if str(m["qty"]).isdigit() else 0
            price = int(m["count"]) if str(m["count"]).isdigit() else 0
            
            milk_data.append({
                "Дата": self.generate_date(2026, 2026),
                "Номер": f"{i+1:05d}",
                "Контрагент": "АО «Прикамский Молкомбинат»",
                "Склад": "Молочный блок",
                "Номенклатура": "Товарное молоко",
                "Количество": qty,
                "Ед. изм.": "л",
                "Цена, руб/л": price,
                "Сумма, руб": qty * price,
                "Банковский счёт": f"{random.randint(100000000, 999999999)} УФК по Пермскому краю",
                "Статус": random.choice(["Оплачено", "Не оплачено"])
            })
        
        animals = self.get_available_animals()
        if animals:
            selected = random.sample(animals, min(len(animals), random.randint(2, 5)))
            for i, animal in enumerate(selected, 1):
                mass = int(animal["mass"])
                price = random.randint(220, 320)
                
                ani_data.append({
                    "Дата": self.generate_date(2026, 2026),
                    "Номер": f"{i:05d}",
                    "Контрагент": "ООО «Прикамский Мясокомбинат»",
                    "Склад": animal["warehouse"],
                    "Инвентарный номер": animal["inv"],
                    "Масса": mass,
                    "Ед. изм.": "кг",
                    "Цена, руб/кг": price,
                    "Сумма, руб": mass * price,
                    "Банковский счёт": f"{random.randint(100000000, 999999999)} УФК по Пермскому краю",
                    "Статус": random.choice(["Оплачено", "Не оплачено"])
                })
        
        return {"milk_sales": milk_data, "animal_sales": ani_data}
    
    def process_seed_receipt(self):
        data = []
        products = [
            {"name": "Хлористый калий", "contr": "ООО «Агрохимсервис»", "warehouse": "Склад удобрений", "account": "10.12.2"},
            {"name": "Калийная соль", "contr": "ООО «Агрохимсервис»", "warehouse": "Склад удобрений", "account": "10.12.2"},
            {"name": "Семена овса", "contr": "ООО «Семена Прикамья", "warehouse": "Зерносклад №1", "account": "10.14"},
            {"name": "Семена пшеницы", "contr": "ООО «Семена Прикамья", "warehouse": "Зерносклад №1", "account": "10.14"},
            {"name": "Семена кукурузы", "contr": "ООО «Зернотрейд»", "warehouse": "Зерносклад №1", "account": "10.14"},
            {"name": "Семена ячменя", "contr": "ООО «Зернотрейд»", "warehouse": "Зерносклад №1", "account": "10.14"},
            {"name": "Суперфосфат", "contr": "ООО «Агрохимсервис»", "warehouse": "Склад удобрений", "account": "10.12.2"}
        ]
        
        for _ in range(random.randint(3, 8)):
            prod = random.choice(products)
            if "Семена" in prod["name"]:
                qty = random.randint(20000, 100000)
                price = random.randint(18, 50)
            else:
                qty = random.randint(30000, 90000)
                price = random.randint(40, 90)
            
            data.append({
                "Дата": self.generate_date(2026, 2026),
                "Контагент": prod["contr"],
                "Склад": prod["warehouse"],
                "Вид движения": "Оприходование",
                "Номенклатура": prod["name"],
                "Количество, кг": qty,
                "Цена, руб/кг": price,
                "Сумма": qty * price,
                "Счёт учёта": prod["account"]
            })
        return data
    
    def process_waybill(self):
        top_data = []
        ydob_data = []
        
        employees = self.get_employees()
        tractors = self.get_tractors()
        fields = self.get_fields()
        
        workers = [e for e in employees if e["work"] == "Тракторист"]
        tractors_only = [t for t in tractors if "трактор" in t["name"].lower()]
        
        if workers and tractors_only and fields:
            norms = {"Вспашка": {"fuel": 15, "seed": 0, "fertilizer": 0}}
            norms2 = {"Внесение удобрений": {"fuel": 3.5, "seed": 0, "fertilizer": 72}, "Посев": {"fuel": 3.5, "seed": 190, "fertilizer": 0}}
            fert_items = ["Хлористый калий", "Калийная соль", "Суперфосфат"]
            
            for _ in range(random.randint(2, 5)):
                worker = random.choice(workers)
                tractor = random.choice(tractors_only)
                field = random.choice(fields)
                work = random.choice(list(norms.keys()))
                ha = random.randint(40, 360)
                fuel = int(ha * norms[work]["fuel"])
                
                top_data.append({
                    "Дата": self.generate_date(2026, 2026),
                    "Документ": "Путевой лист",
                    "Подразделение": "Машино-тракторный парк",
                    "Сотрудник": worker["fio"],
                    "Техника": tractor["name"],
                    "Прицеп": "-",
                    "Вид работы": work,
                    "Структура посевных площадей": field["name"],
                    "Единица измерения": "га",
                    "Выработано, га": ha,
                    "Счёт затрат": "20.01.1",
                    "Номенклатура": "Дизельное топливо",
                    "Количество, л": fuel
                })
            
            for _ in range(random.randint(2, 5)):
                worker = random.choice(workers)
                tractor = random.choice(tractors_only)
                field = random.choice(fields)
                work2 = random.choice(list(norms2.keys()))
                ha = random.randint(40, 360)
                norm2 = norms2[work2]
                fuel = int(ha * norm2["fuel"])
                
                if work2 == "Посев":
                    stock = "Зерносклад №1"
                    nomen = "Семена"
                    material_qty = int(ha * norm2["seed"])
                elif work2 == "Внесение удобрений":
                    stock = "Склад удобрений"
                    nomen = random.choice(fert_items)
                    material_qty = int(ha * norm2["fertilizer"])
                else:
                    stock = "-"
                    nomen = "-"
                    material_qty = "-"
                
                ydob_data.append({
                    "Дата": self.generate_date(2026, 2026),
                    "Документ": "Путевой лист",
                    "Подразделение": "Машино-тракторный парк",
                    "Сотрудник": worker["fio"],
                    "Техника": tractor["name"],
                    "Прицеп": "-",
                    "Вид работы": work2,
                    "Структура посевных площадей": field["name"],
                    "Единица измерения": "га",
                    "Выработано, га": ha,
                    "Счёт затрат": "20.01.1",
                    "Номенклатура (топливо)": "Дизельное топливо",
                    "Количество, л": fuel,
                    "Склад": stock,
                    "Номенклатура": nomen,
                    "Количество, кг": material_qty
                })
        
        return {"top_data": top_data, "ydob_data": ydob_data}
    
    def process_fuel_receipt(self):
        data = []
        products = [
            {"name": "Фильтр топливный МТЗ-82", "contr": "ИП Сидоров В.В.", "account": "10.5"},
            {"name": "Ремень молотилки Claas Lexion 770", "contr": "ООО «Сельхозтехника-Центр»", "account": "10.5"},
            {"name": "Бензин АИ-92", "contr": "ООО «Нефтепродукт»", "account": "10.03.01"},
            {"name": "Дизельное топливо", "contr": "ООО «ПермАгроГСМ»", "account": "10.03.01"},
            {"name": "Масло моторное", "contr": "ООО «Зернотрейд»", "account": "10.03.01"}
        ]
        
        employees = self.get_employees()
        workers = [e for e in employees if e["work"] in ["Инженер-механик", "Слесарь-ремонтник", "Водитель"]]
        
        for _ in range(random.randint(3, 8)):
            prod = random.choice(products)
            if "Фильтр" in prod["name"] or "Ремень" in prod["name"]:
                qty = random.randint(1, 20)
                price = random.randint(400, 1000)
            else:
                qty = random.randint(5000, 15000)
                price = random.randint(50, 70)
            
            data.append({
                "Дата": self.generate_date(2026, 2026),
                "Контагент": prod["contr"],
                "Склад": "Парк техники",
                "Вид движения": "Оприходование",
                "Номенклатура": prod["name"],
                "Количество": qty,
                "Цена, руб": price,
                "Сумма": qty * price,
                "Счёт учёта": prod["account"],
                "Сотрудник": random.choice(workers)["fio"] if workers else ""
            })
        return data
    
    def generate_date(self, start_year=2010, end_year=2023):
        year = random.randint(start_year, end_year)
        month = random.randint(1, 12)
        day = random.randint(1, 28)
        return f"{day:02d}.{month:02d}.{year}"
    
    def run_all_processes(self):
        return {
            "process_buy_animal": self.process_buy_animal(),
            "process_birth": self.process_birth(),
            "process_weight_gain": self.process_weight_gain(),
            "process_transfer": self.process_transfer(),
            "process_milk_yield": self.process_milk_yield(),
            "process_sale_products": self.process_sale_products(),
            "process_seed_receipt": self.process_seed_receipt(),
            "process_waybill": self.process_waybill(),
            "process_fuel_receipt": self.process_fuel_receipt()
        }
class GeneratorService:
    def __init__(self):
        
        # Загрузка данных из JSON файлов
        self.load_data()

        self.livestock_table_data = []
        self.ani_ost_table_data = []
        self.employee_table_data = []
        self.dog_emp_table_data = []
        self.material_ost_table_data = []
        self.machine_table_data = []
        self.posev_table_data = []

    def load_data(self):
        """Загрузка данных из JSON файлов"""
        BASE_DIR = os.path.dirname(os.path.abspath(__file__))
        data_dir = os.path.join(BASE_DIR, "data")
        
        # Проверяем существование директории
        if not os.path.exists(data_dir):
            os.makedirs(data_dir)
            print(f"Создана папка {data_dir}.")
            return
        
        try:
            # Загружаем данные организации
            with open(f"{data_dir}/organization.json", "r", encoding="utf-8") as f:
                self.org_data = json.load(f)
            
            # Загружаем данные культур
            with open(f"{data_dir}/crops.json", "r", encoding="utf-8") as f:
                self.crop_data = json.load(f)
            
            # Загружаем данные животных
            with open(f"{data_dir}/animals.json", "r", encoding="utf-8") as f:
                self.animal_data = json.load(f)
            
            # Загружаем данные зданий
            with open(f"{data_dir}/buildings.json", "r", encoding="utf-8") as f:
                self.building_data = json.load(f)
            
            # Загружаем данные техники
            with open(f"{data_dir}/machines.json", "r", encoding="utf-8") as f:
                self.machine_data = json.load(f)
            
            # Загружаем данные техники
            with open(f"{data_dir}/materials.json", "r", encoding="utf-8") as f:
                self.material_data = json.load(f)

            # Загружаем данные контрагентов
            with open(f"{data_dir}/contractors.json", "r", encoding="utf-8") as f:
                self.contractor_data = json.load(f)
            
            # Загружаем данные сотрудников
            with open(f"{data_dir}/employees.json", "r", encoding="utf-8") as f:
                self.employee_data = json.load(f)
                
        except FileNotFoundError as e:
            print(f"Ошибка загрузки данных: {e}")
            print("Пожалуйста, убедитесь, что все JSON файлы находятся в папке 'data/'")
            self.org_data = {"organizations": []}
            self.crop_data = {"crops": []}
            self.animal_data = {"breeds": [], "card": []}
            self.building_data = {"buildings": []}
            self.machine_data = {"machines": []}
            self.material_data = {"materials": []}
            self.contractor_data = {"contractors": []}
            self.employee_data = {
                "first_names_male": [], "first_names_female": [], 
                "last_names_male": [], "last_names_female": [], "middle_names_male": [],
                "middle_names_female": [], "departments": [], "positions": {}
            }
    
    def generate_inn(self):
        """Генерация ИНН"""
        region = random.randint(1, 92)
        inspection = random.randint(1, 99)
        number = random.randint(100000, 999999)
        return f"{region:02d}{inspection:02d}{number}"
    
    def generate_kpp(self):
        """Генерация КПП"""
        region = random.randint(1, 92)
        reason = random.randint(1, 50)
        inspection = random.randint(1, 99)
        return f"{region:02d}{reason:02d}{inspection}"
    
    def generate_ogrn(self):
        """Генерация ОГРН"""
        year = random.randint(2002, 2023)
        region = random.randint(1, 92)
        number = random.randint(1000000, 9999999)
        full = f"1{year % 100:02d}{region:02d}{number}"
        # Вычисляем контрольную сумму
        check = int(full) % 11 % 10
        return f"{full}{check}"
    
    def generate_phone(self):
        """Генерация номера телефона"""
        region = "342"
        part1 = random.randint(200, 999)
        part2 = random.randint(10, 99)
        part3 = random.randint(10, 99)
        return f"+7 ({region}) {part1}-{part2}-{part3}"
    
    def generate_email(self, name, domain):
        """Генерация email"""
        domains = ["ru", "com", "net", "org"]
        return f"{name.lower().replace(' ', '.')}@{domain}.{random.choice(domains)}"
    
    def generate_snils(self):
        """Генерация СНИЛС"""
        part1 = random.randint(100, 999)
        part2 = random.randint(100, 999)
        part3 = random.randint(100, 999)
        control = random.randint(10, 99)
        return f"{part1}-{part2}-{part3} {control}"
    
    def generate_passport(self):
        """Генерация паспортных данных"""
        series = f"{random.randint(10, 99):02d} {random.randint(10, 99):02d}"
        number = f"{random.randint(100000, 999999):06d}"
        return series, number
    
    def generate_date(self, start_year=2010, end_year=2023):
        """Генерация случайной даты"""
        year = random.randint(start_year, end_year)
        month = random.randint(1, 12)
        day = random.randint(1, 28)
        return f"{day:02d}.{month:02d}.{year}"
    
    def generate_fio(self, gender):
            if gender == "Мужской":
                first_name = random.choice(self.employee_data["first_names_male"])
                middle_name = random.choice(self.employee_data["middle_names_male"])
                last_name = random.choice(self.employee_data["last_names_male"])

            else:
                first_name = random.choice(self.employee_data["first_names_female"])
                middle_name = random.choice(self.employee_data["middle_names_female"])
                last_name = random.choice(self.employee_data["last_names_female"])

            return f"{last_name} {first_name} {middle_name}"
    
    def generate_organization(self):
            org = random.choice(self.org_data["organizations"])
            return (
                org["type"],
                org['short_name'],
                org['full_name'],
                self.generate_inn(),
                self.generate_kpp(),
                self.generate_ogrn(),
                self.generate_date(2000, 2020),
                f"{org['office']} №{random.randint(1, 30)} по Пермскому краю",
                f"{random.randint(100000, 999999)}, {org['address_suffix']}",
                f"Совпадает с юридическим",
                self.generate_phone(),
                self.generate_email(org['short_name'], "agro")
            )

    def generate_divisions(self):
            return [
                "Администрация",
                "Животноводческий комплекс",
                "Машино-тракторный парк",
                "Растениеводческий участок",
                "Складское хозяйство"
            ]
        
    def generate_banks(self):

            banks = ["Сбербанк", "ВТБ", "Альфа-Банк", "Газпромбанк", "Россельхозбанк"]
            return [
                (
                    random.choice(banks),
                    f"40702810{random.randint(10000000, 99999999)}"
                )
                for _ in range(random.randint(1, 3))
            ]

    def generate_tax(self):
            return [
                (
                    f"{random.randint(1000, 9999)}",
                    "ИФНС России по Свердловскому району г. Пермь",
                    "Инспекция ФНС по Свердловскому району г. Пермь",
                    f"{random.randint(10000000, 99999999)}",
                    f"{random.randint(10000000, 99999999)}"
                )
                for _ in range(random.randint(1, 3))
            ]

    def generate_pfr(self):
            return [
                (
                    f"{random.randint(100000000, 999999999)}",
                    f"{random.randint(100000, 999999)}",
                    "Отделение СФР по Пермскому краю"
                )
                for _ in range(random.randint(1, 2))
            ]

    def generate_fss(self):
            return [
                (
                    f"{random.randint(100000000000000, 999999999999999)}",
                    f"{random.randint(10000, 99999)}",
                    "Пермское региональное отделение ФСС РФ"
                )
                for _ in range(random.randint(1, 2))
            ]

    def generate_stat(self):
            okopf_list = ["12300", "12400", "12500"]
            okfs_list = ["16", "17"]
            okved_list = ["01.41", "01.42", "01.43"]
            okpo_list = ["98765432", "98765433"]
            rosstat_list = ["59000", "59001"]

            return [
                (
                    random.choice(okopf_list),
                    random.choice(okfs_list),
                    random.choice(okved_list),
                    random.choice(okpo_list),
                    random.choice(rosstat_list)
                )
                for _ in range(random.randint(1, 2))
            ]
        
    def generate_fields(self):

            groups = ["Зерновые культуры", "Кормовые культуры", "Технические культуры", "Пар"]

            fields_data = []

            for i in range(1, random.randint(3, 8)):
                group = random.choice(groups)
                field_name = f"Поле №{i}"
                area = random.randint(140, 520)
                field_data = {
                    "group": group,
                    "name": field_name,
                    "area": area,
                    "code": f"00-00000{i}",
                    "division": "Растениеводческий участок"
                }
                fields_data.append(field_data)
            return fields_data

    def generate_nomenclature(self):
            count = random.randint(6, 10)
            nomen_list = self.crop_data["nomen"]
            sample = random.sample(nomen_list, k=min(count, len(nomen_list)))

            nomen_data = []

            for nomen in sample:
                nomen_data.append((
                    "Материал",
                    nomen["name"],
                    nomen["fullname"],
                    "кг"
                ))
            return {
                "table_data": nomen_data,
                "sample": sample
            }
        
    def generate_posev(self, fields_data):

            year = 2026

            soils = [
                "Чернозем",
                "Дерново-подзолистые",
                "Суглинок",
                "Супесь"
            ]

            allowed_crops_by_field_group = {
                "Зерновые культуры": ["Зерновые культуры", "Бобовые культуры"],
                "Кормовые культуры": ["Кормовые культуры", "Бобовые культуры"],
                "Технические культуры": ["Технические культуры", "Масличные культуры"],
                "Пар": []
            }

            soils_by_group = {
                "Зерновые культуры": ["Чернозем", "Суглинок"],
                "Кормовые культуры": ["Суглинок", "Супесь", "Дерново-подзолистые"],
                "Бобовые культуры": ["Суглинок", "Супесь"],
                "Масличные культуры": ["Чернозем", "Суглинок"],
                "Технические культуры": ["Чернозем", "Суглинок"]
            }

            fertilizers_by_group = {
                "Зерновые культуры": [
                    "Аммиачная селитра",
                    "Суперфосфат",
                    "Калийная соль"
                ],
                "Кормовые культуры": [
                    "Навоз",
                    "Компост",
                    "Калий хлористый"
                ],
                "Бобовые культуры": [
                    "Фосфорные удобрения",
                    "Калийные удобрения"
                ],
                "Масличные культуры": [
                    "Суперфосфат",
                    "Азотные удобрения"
                ],
                "Технические культуры": [
                    "Комплексные удобрения",
                    "Калийные удобрения"
                ]
            }

            posev_data = []
            crop_table_data = []

            used_crops = set()
            used_crop_table = set()
            self.posev_table_data = []

            if self.crop_data["crops"]:
                for field  in fields_data:

                    field_name = field["name"]
                    area = field["area"]
                    field_group = field["group"]

                    if field_group == "Пар":
                        par_types = ["Чистый пар", "Занятый пар"]
                        par_type = random.choice(par_types)

                        if par_type == "Чистый пар":
                            fertilizers = random.choice([
                                "Органические удобрения (навоз)",
                                "Без внесения удобрений"
                            ])

                        else:  # занятый пар
                            fertilizers = "Сидераты (горчица, рапс)"

                        posev_data.append((
                            f"{field_name} {par_type} {str(year)[-2:]}г",
                            str(year),
                            field_name,
                            "Растениеводческий участок",
                            par_type,
                            area,
                            year,
                            random.choice(soils),
                            fertilizers
                        ))
                        self.posev_table_data.append((
                            f"{field_name} {par_type} {str(year)[-2:]}г",
                            str(year),
                            field_name,
                            "Растениеводческий участок",
                            par_type,
                            area,
                            year,
                            random.choice(soils),
                            fertilizers
                        ))
                        continue

                    allowed_groups = allowed_crops_by_field_group.get(field_group, [])
        
                    filtered_crops = [
                        c for c in self.crop_data["crops"]
                        if c["group"] in allowed_groups
                    ]

                    if not filtered_crops:
                        continue

                    available_crops = [
                        c for c in filtered_crops
                        if c["name"] not in used_crops
                    ]

                    # если все уже использованы — сбрасываем
                    if not available_crops:
                        used_crops.clear()
                        available_crops = filtered_crops

                    crop = random.choice(available_crops)
                    used_crops.add(crop["name"])

                    crop_name = crop["name"]
                    crop_group = crop["group"]

                    soil = random.choice(soils_by_group.get(crop_group, soils))

                    fert_list = fertilizers_by_group.get(crop_group, ["Минеральные удобрения"])
                    fertilizers = ", ".join(
                        random.sample(fert_list, k=min(2, len(fert_list)))
                    )

                    posev_data.append((
                        f"{field_name} {crop_name} {str(year)[-2:]}г",
                        str(year),
                        field_name,
                        "Растениеводческий участок",
                        crop_name,
                        area,
                        year,
                        soil,
                        fertilizers
                    ))
                    self.posev_table_data.append((
                        f"{field_name} {crop_name} {str(year)[-2:]}г",
                        str(year),
                        field_name,
                        "Растениеводческий участок",
                        crop_name,
                        area,
                        year,
                        soil,
                        fertilizers
                    ))

                    if crop_name not in used_crop_table:
                        crop_table_data.append({
                            "name": crop_name,
                            "group": crop_group
                        })
                        used_crop_table.add(crop_name)

            return {
                "posev_data": posev_data,
                "crop_table_data": crop_table_data
            }

    def generate_crop_ost(self, sample):

            crop_ost_data = []

            for i, nomen in enumerate(sample, start=1):

                name = nomen["name"]

                if "Сено" in name or "Сенаж" in name:
                    warehouse = "Склад кормов"
                elif "Солома" in name:
                    warehouse = "Склад соломы"
                else:
                    warehouse = "Зерносклад №1"

                if "Семена" in name:
                    quantity = random.randint(1000, 5000)
                elif "Силос" in name:
                    quantity = random.randint(50000, 200000)
                elif "Сено" in name or "Сенаж" in name:
                    quantity = random.randint(20000, 80000)
                elif "Солома" in name:
                    quantity = random.randint(15000, 60000)
                else:
                    quantity = random.randint(10000, 150000)

                crop_ost_data.append((
                    name,
                    "10.13.1",
                    warehouse,
                    "Урожай 2025",
                    quantity,
                    "кг",
                    f"{i:09d}",
                    "Растениеводческий участок"
                ))
            return crop_ost_data
        
    def generate_livestock(self):

            group_counts = {
                "Коровы дойные": 0,
                "Коровы сухостойные": 0,
                "Нетели (стельные)": 0,
                "Бычки старше 1 года": 0,
                "Телки до 1 года": 0,
                "Бычки до 1 года": 0,
                "Телки новорожденные (0–2 мес)": 0,
                "Бычки новорожденные (0–2 мес)": 0
            }

            def map_status_to_group(status):
                if status == "Дойная корова":
                    return "Коровы дойные"
                
                if status == "Сухостойная корова":
                    return "Коровы сухостойные"

                elif status == "Нетели":
                    return "Нетели (стельные)"

                elif status == "Бычки старше 1 года":
                    return "Бычки старше 1 года"

                elif status == "Телки до 1 года":
                    return "Телки до 1 года"

                elif status == "Бычок до 1 года":
                    return "Бычки до 1 года"

                elif status == "Телки новорожденные":
                    return "Телки новорожденные (0–2 мес)"

                elif status == "Бычок новорожденный":
                    return "Бычки новорожденные (0–2 мес)"

                return None
            
            def generate_birth_date_by_status(status):
                today = datetime.now()

                if status in ["Бычок новорожденный", "Телки новорожденные"]:
                    return today - timedelta(days=random.randint(0, 30))

                elif status in ["Бычок до 1 года", "Телки до 1 года"]:
                    return today - timedelta(days=random.randint(31, 365))

                elif status in ["Бычки старше 1 года"]:
                    return today - timedelta(days=random.randint(366, 3 * 365))

                elif status in ["Нетели"]:
                    return today - timedelta(days=random.randint(365, 2 * 365))

                elif status in ["Дойная корова", "Сухостойная корова"]:
                    return today - timedelta(days=random.randint(2 * 365, 8 * 365))

                return today - timedelta(days=random.randint(100, 2000))
            
            def get_weight_by_status(status):
                if "Телки новорожденные" in status or "Бычок новорожденный" in status:
                    return random.randint(25, 45)
                elif "Телки до 1 года" in status or "Бычок до 1 года" in status:
                    return random.randint(80, 200)
                elif "Бычки старше 1 года" in status:
                    return random.randint(350, 600)
                elif "Дойная корова" in status or "Сухостойная корова" in status:
                    return random.randint(400, 700)
                elif "Нетели" in status:
                    return random.randint(350, 550)
                return random.randint(100, 500)
        
            building_by_group = {
                "Коровы дойные": ["Коровник №1"],
                "Коровы сухостойные": ["Коровник №2 (сухостойные и нетели)"],
                "Нетели (стельные)": ["Коровник №2 (сухостойные и нетели)"],
                "Бычки старше 1 года": ["Коровник №3"],
                "Телки до 1 года": ["Коровник №4"],
                "Бычки до 1 года": ["Коровник №3", "Коровник №4"],
                "Телки новорожденные (0–2 мес)": ["Коровник №5 (телята новорожденные)"],
                "Бычки новорожденные (0–2 мес)": ["Коровник №5 (телята новорожденные)"]
            }

            livestock_data = []
            ani_ost_data = []
            self.livestock_table_data = [] 
            self.ani_ost_table_data = []  
        
            if self.animal_data:
                for i in range(1, random.randint(12, 20)):
                    ani = random.choice(self.animal_data["card"])

                    status = ani["status"]
                    sex = ani["sex"]

                    group_name = map_status_to_group(status)
                    if group_name:
                        group_counts[group_name] += 1
                        buildings = building_by_group.get(group_name, ["Коровник №1"])
                        building = random.choice(buildings)
                    else:
                        building = "Коровник №1"

                    birth_dt = generate_birth_date_by_status(status)
                    birth_date = birth_dt.strftime("%Y-%m-%d")
                    inv_number = f"КРС-{random.randint(100, 999)}"

                    livestock_data.append((
                        inv_number,
                        sex,
                        birth_date,
                        random.choice(self.animal_data["breeds"]),
                        status
                    ))

                    self.livestock_table_data.append((
                        inv_number,
                        sex,
                        birth_date,
                        random.choice(self.animal_data["breeds"]),
                        status
                    ))

                    if status == "Дойная корова" or status == "Сухостойная корова":
                        account = "01.01"
                    else:
                        account =  "11.02"

                    if account == "11.02":
                        weight = get_weight_by_status(status)
                        amount = weight * random.randint(200, 350)

                        ani_ost_data.append((
                            account,
                            inv_number,
                            "Животноводческий комплекс",
                            building,
                            weight,
                            amount,
                            "",
                            "",
                            "",
                            1
                        ))
                        self.ani_ost_table_data.append((
                            account,
                            inv_number,
                            "Животноводческий комплекс",
                            building,
                            weight,
                            amount,
                            "",
                            "",
                            "",
                            1
                        ))

                    else: 
                        initial_cost = random.randint(120000, 180000)
                        start_date = datetime.now() - timedelta(days=random.randint(0, 1000))

                        ani_ost_data.append((
                            account,
                            inv_number,
                            "Животноводческий комплекс",
                            building,
                            "",  
                            "", 
                            initial_cost,
                            60,
                            start_date.strftime("%d.%m.%Y"),
                            1
                        ))
                        self.ani_ost_table_data.append((
                            account,
                            inv_number,
                            "Животноводческий комплекс",
                            building,
                            "",  
                            "", 
                            initial_cost,
                            60,
                            start_date.strftime("%d.%m.%Y"),
                            1
                        ))

                summary_text = "\n".join(
                    f"{k}: {v} голов" for k, v in group_counts.items()
                )

                return {
                    "livestock": livestock_data,
                    "ani_ost": ani_ost_data,
                    "summary": summary_text
                }
        
    def generate_buildings(self):
            if not self.building_data["buildings"]:
                return []

            return [
                (
                    b["name"],
                    b["purpose"],
                    b["area"],
                    b["cost"]
                )
                for b in self.building_data["buildings"]
            ]
        
    def generate_machines(self):

            if self.machine_data["machines"]:

                machines = self.machine_data["machines"]

                tractors = [m for m in machines if m["type"] == "Трактор"]
                plows = [m for m in machines if m["type"] == "Плуг"]
                others = [m for m in machines if m["type"] not in ["Трактор", "Плуг"]]

                locations = ["Парк техники", "Транспортный цех"]

                result = []

                if tractors:
                    result += random.sample(tractors, min(len(tractors), 3))

                if plows:
                    result += random.sample(plows, min(len(plows), 2))

                rest = random.sample(others, random.randint(2, 5)) if others else []
                result += rest

                random.shuffle(result)

                machine_table_data = []
                self.machine_table_data = [] 
                
                for i, machine in enumerate(result, 1):
                    buy_date = self.generate_date(2021, 2025)
                    manufacture_date = self.generate_date(2015, 2020)

                    machine_table_data.append((
                        f"{machine['type']} {machine['model']} №{i}",
                        machine["brand"],
                        random.choice(locations),
                        machine["model"],
                        self.generate_date(2015, 2020),
                        f"{random.randint(10000000, 99999999)}",
                        machine["power"] if machine["power"] else "—",
                        f"D{random.randint(10000, 99999)}",
                        f"ЗНТ-{random.randint(1, 999):03d}",
                        random.randint(60, 240),
                        f"{(machine['cost'] + random.randint(-100000, 100000)):,}".replace(",", " "),
                        buy_date,
                        buy_date,
                        "—"
                    ))
                    self.machine_table_data.append((
                        f"{machine['type']} {machine['model']} №{i}",
                        machine["brand"],
                        random.choice(locations),
                        machine["model"],
                        self.generate_date(2015, 2020),
                        f"{random.randint(10000000, 99999999)}",
                        machine["power"] if machine["power"] else "—",
                        f"D{random.randint(10000, 99999)}",
                        f"ЗНТ-{random.randint(1, 999):03d}",
                        random.randint(60, 240),
                        f"{(machine['cost'] + random.randint(-100000, 100000)):,}".replace(",", " "),
                        buy_date,
                        buy_date,
                        "—"
                    ))
                return machine_table_data
            
    def generate_materials(self):
            if self.material_data["materials"]:
                materials_sample = self.material_data["materials"]
                materials_table = []
                for material in materials_sample:
                    materials_table.append((
                        material["type"],
                        material["name"],
                        material["fullname"],
                        material["ed"]
                    ))

                materials_sample = random.sample(self.material_data["materials"], random.randint(5, 8))
                materials_ost_table = []
                self.material_ost_table_data = [] 
                for i, material in enumerate(materials_sample, 1):
                    materials_ost_table.append((
                        material["nomen"],
                        material["account"],
                        material["warehouse"],
                        material["count"],
                        material["ed"],
                        f"{i:09d}",
                        material["suplier"],
                        material["price"],
                        material["department"]
                    ))
                    self.material_ost_table_data.append((
                        material["nomen"],
                        material["account"],
                        material["warehouse"],
                        material["count"],
                        material["ed"],
                        f"{i:09d}",
                        material["suplier"],
                        material["price"],
                        material["department"]
                    ))
                return {
                    "materials_table": materials_table,
                    "materials_ost_table": materials_ost_table
                }
        
    def generate_contractors(self):
            if self.contractor_data["contractors"]:
                contractors_sample = random.sample(self.contractor_data["contractors"], random.randint(6, 12))
                contractors_table = []
                contracts_table = []

                for contractor in contractors_sample:
                    contractors_table.append((
                        contractor["comment"],
                        contractor["type"],
                        contractor["doc_name"],
                        contractor['prog_name'],
                        "Россия",
                        self.generate_inn(),
                        self.generate_kpp(),
                        self.generate_ogrn(),
                        random.choice(["ПАО «Пермский филиал Сбербанк»", "ПАО «Россельхозбанк»", "ПАО «ВТБ»", "ПАО «Газпромбанк»", "АО «Альфа-Банк»"]),
                        f"40702810{random.randint(10000000, 99999999)}",
                        contractor["street"],
                        contractor['street2'],
                        self.generate_phone(),
                        contractor["email"],
                        f"{random.choice(['Иванов', 'Петрова', 'Сидоров', 'Смирнова', 'Волков'])} {random.choice(['А.С.', 'В.П.', 'Д.И.', 'Д.А.', 'А.В.'])}"
                    ))
            
                    # Договоры
                    contracts_table.append((
                        contractor["contract_type"],
                        contractor["contract_name"],
                        self.generate_date(2024, 2025),
                        random.randint(2, 6)
                    ))
                
                return {
                    "contractors_table": contractors_table,
                    "contracts_table": contracts_table
                }
            
    def generate_employees(self):
            position_counts = {
                "Директор": 1,
                "Главный бухгалтер": 1,
                "Бухгалтер": 2,
                "Главный агроном": 1,
                "Агроном": 2,
                "Тракторист": 4,
                "Комбайнер": 3,
                "Механизатор": 3,
                "Скотник": 4,
                "Доярка": 5,
                "Ветеринарный врач": 2,
                "Зоотехник": 1,
                "Слесарь-ремонтник": 2,
                "Водитель": 2,
                "Программист 1С": 1,
                "Системный администратор": 1
            }

            female_positions = {
                "Доярка"
            }

            male_positions = {
                "Тракторист",
                "Комбайнер",
                "Слесарь-ремонтник"
            }

            salary_base = {
                            "Директор": 120000,
                            "Главный бухгалтер": 90000,
                            "Главный агроном": 60000,
                            "Главный ветврач": 85000,
                            "Инженер-механик": 90000,
                            "Бухгалтер": 50000,
                            "Ветеринарный врач": 55000,
                            "Зоотехник": 50000,
                            "Механизатор": 50000,
                            "Тракторист": 50000,
                            "Комбайнер": 54000,
                            "Скотник": 35000,
                            "Слесарь-ремонтник": 42000,
                            "Менеджер": 50000
                        }

            employees = []
            contracts = []
            self.employee_table_data = []   
            self.dog_emp_table_data = [] 
            contract_id = 1
                
            for department, positions in self.employee_data["positions"].items():
                for position in positions:

                    count = position_counts.get(position, 1)

                    for _ in range(count):
                        
                        if position in female_positions:
                            gender = "Женский"

                        elif position in male_positions:
                            gender = "Мужской"

                        else:
                            gender = random.choice(["Мужской", "Женский"])
                        
                        passport_series, passport_number = self.generate_passport()
                        
                        base_salary = salary_base.get(position, 40000)
                        salary = base_salary + random.randint(-5000, 10000) 
                        fio = self.generate_fio(gender)
                        last_name = fio.split()[0].lower()
                        email = f"{last_name}@company.ru"
                        
                        employee = (
                            fio,
                            gender,
                            self.generate_date(1960, 2000),
                            self.generate_inn(),
                            self.generate_snils(),
                            "РФ",
                            f"{passport_series} №{passport_number}",
                            random.choice(["УМВД", "ОМВД", "ОВД"]) + " России по Пермскому краю",
                            self.generate_date(2010, 2020),
                            f"{random.randint(100000, 999999)}, Пермский край, {random.choice(['д. Ключи', 'с. Лесное', 'д. Новая', 'д. Зеленая', 'г. Чусовой', 'с. Савино'])}, ул. {random.choice(['Заречная', 'Молодёжная', 'Советская', 'Центральная', 'Полевая', 'Луговая'])}, д. {random.randint(1, 99)}",
                            self.generate_phone(),
                            email
                        )

                        contract = (
                            contract_id,
                            self.generate_date(2022, 2025),
                            department,
                            position,
                            salary,
                            "1",
                            "Основное место работы",
                            "Прием на работу"
                        )
                        employees.append(employee)
                        self.employee_table_data.append(employee)
                        contracts.append(contract)
                        self.dog_emp_table_data.append(contract)
                        contract_id += 1

            return {
                "employees": employees,
                "contracts": contracts
            }

    def generate_user_data(self, uid, name, email):
        fields = self.generate_fields()
        nomen_result = self.generate_nomenclature()
        sample = nomen_result["sample"]

        user_data =  {
            "uid": uid,
            "name": name,
            "email": email,

            "organization": self.generate_organization(),
            "divisions": self.generate_divisions(),
            "banks": self.generate_banks(),
            "tax": self.generate_tax(),
            "pfr": self.generate_pfr(),
            "fss": self.generate_fss(),
            "stat": self.generate_stat(),
            "fields": fields,
            "nomenclature": nomen_result,
            "posev": self.generate_posev(fields),
            "crop_ost": self.generate_crop_ost(sample),
            "livestock": self.generate_livestock(),
            "buildings": self.generate_buildings(),
            "machines": self.generate_machines(),
            "materials": self.generate_materials(),
            "contractors": self.generate_contractors(),
            "employees": self.generate_employees(),

            "created_at": datetime.now().isoformat(),

            "livestock_table_data": self.livestock_table_data,
            "ani_ost_table_data": self.ani_ost_table_data,
            "employee_table_data": self.employee_table_data,
            "dog_emp_table_data": self.dog_emp_table_data,
            "material_ost_table_data": self.material_ost_table_data,
            "machine_table_data": self.machine_table_data,
            "posev_table_data": self.posev_table_data,
            "animal_data": self.animal_data
        }
    
        processor = ProcessesProcessor(user_data)
        processes_result = processor.run_all_processes()
        user_data["processes"] = processes_result
        
        return user_data

if __name__ == "__main__":
    uid = sys.argv[1]
    name = sys.argv[2]
    email = sys.argv[3]

    service = GeneratorService()
    result = service.generate_user_data(uid, name, email)

    print(json.dumps(result, ensure_ascii=False))
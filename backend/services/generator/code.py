import random
import json
from datetime import datetime, timedelta
import os
# from processes import ProcessesTab
import sys

sys.stdout.reconfigure(encoding='utf-8')
sys.stderr.reconfigure(encoding='utf-8')

class GeneratorService:
    def __init__(self):
        
        # Загрузка данных из JSON файлов
        self.load_data()

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
                        contracts.append(contract)
                        contract_id += 1

            return {
                "employees": employees,
                "contracts": contracts
            }

    def generate_user_data(self, uid, name, email):
        fields = self.generate_fields()
        nomen_result = self.generate_nomenclature()
        sample = nomen_result["sample"]

        return {
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

            "created_at": datetime.now().isoformat()
        }
    
import sys

if __name__ == "__main__":
    uid = sys.argv[1]
    name = sys.argv[2]
    email = sys.argv[3]

    service = GeneratorService()
    result = service.generate_user_data(uid, name, email)

    print(json.dumps(result, ensure_ascii=False))
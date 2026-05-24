import tkinter as tk
from tkinter import ttk
import random
import tkinter.font as tkFont


class ProcessesTab:

    def __init__(self, parent, app):
        self.parent = parent
        self.app = app

        self.container = ttk.Frame(parent)
        self.container.pack(fill="both", expand=True)

        self.left_frame = ttk.Frame(self.container, width=250)
        self.left_frame.pack(side="left", fill="y")

        self.right_frame = ttk.Frame(self.container)
        self.right_frame.pack(side="right", fill="both", expand=True)

        self.create_menu()

    def refresh_processes(self):

        if hasattr(self, "current_section"):
            self.show_section(self.current_section)

    def create_menu(self):

        sections = [
            "Животноводство",
            "Растениеводство",
            "Основные средства",
            "Зарплата"
        ]

        tk.Label(
            self.left_frame,
            text="Процессы",
            font=("Arial", 12, "bold")
        ).pack(pady=10)

        for section in sections:
            ttk.Button(
                self.left_frame,
                text=section,
                command=lambda s=section: self.show_section(s)
            ).pack(fill="x", padx=10, pady=5)

    def show_section(self, section_name):
        
        self.current_section = section_name
        self.clear_right()

        tk.Label(
            self.right_frame,
            text=f"Раздел: {section_name}",
            font=("Arial", 12, "bold")
        ).pack(pady=10)

        processes = self.get_processes_for_section(section_name)

        for proc in processes:
            ttk.Button(
                self.right_frame,
                text=proc,
                command=lambda p=proc: self.open_process(p)
            ).pack(fill="x", padx=10, pady=4)

    def create_process_table(self, columns):

        container = ttk.Frame(self.right_frame)
        container.pack(fill="both", expand=True, padx=10, pady=10)

        vsb = ttk.Scrollbar(container, orient="vertical")
        hsb = ttk.Scrollbar(container, orient="horizontal")

        tree = ttk.Treeview(
            container,
            columns=columns,
            show="headings",
            yscrollcommand=vsb.set,
            xscrollcommand=hsb.set,
            selectmode="extended" 
        )

        vsb.config(command=tree.yview)
        hsb.config(command=tree.xview)

        vsb.pack(side="right", fill="y")
        hsb.pack(side="bottom", fill="x")
        tree.pack(fill="both", expand=True)

        for col in columns:

            tree.heading(col, text=col)

            tree.column(
                col,
                width=150,
                minwidth=50,
                stretch=False
            )

        def on_mousewheel(event):
            if event.state & 0x1:  
                tree.xview_scroll(int(-1*(event.delta/120)), "units")
            else:
                tree.yview_scroll(int(-1*(event.delta/120)), "units")
        
        tree.bind("<MouseWheel>", on_mousewheel)
        tree.bind("<Control-MouseWheel>", on_mousewheel)

        return tree

    def adjust_column_widths(self, tree):

        font = tkFont.Font()
        
        tree.update_idletasks()
        
        total_width = 0

        for col in tree["columns"]:

            max_width = font.measure(col) + 40

            for item in tree.get_children():
                cell_value = tree.set(item, col)
                if cell_value:
                    cell_width = font.measure(str(cell_value)) + 40
                    if cell_width > max_width:
                        max_width = cell_width

            tree.column(col, width=max_width, stretch=False)
            total_width += max_width

        tree.update_idletasks()

    def clear(self, tree):
        for i in tree.get_children():
            tree.delete(i)

    def clear_right(self):

        for widget in self.right_frame.winfo_children():
            widget.destroy()

    def get_processes_for_section(self, section):

        data = {
            "Животноводство": [
                "Оприходование животных",
                "Приплод",
                "Привес",
                "Перевод животных из одной группы в другую",
                "Надой",
                "Продажа продукции"
            ],

            "Растениеводство": [
                "Оприходование",
                "Путевой лист"
            ],

            "Основные средства": [
                "Оприходование ос"
            ],

            "Зарплата": [
                "Начисление заработной платы"
            ]
        }

        return data.get(section, [])

    def open_process(self, process_name):

        process_map = {
            
            "Оприходование животных": self.process_buy_animal,
            "Приплод": self.process_birth,
            "Привес": self.process_weight_gain,
            "Перевод животных из одной группы в другую": self.process_transfer,
            "Надой": self.process_milk_yield,
            "Продажа продукции": self.process_sale_products,

            "Оприходование": self.process_seed_receipt,
            "Путевой лист": self.process_waybill,

            "Оприходование ос": self.process_fuel_receipt,
            
            "Начисление заработной платы": self.process_salary
        }

        if process_name in process_map:
            process_map[process_name]()

    def get_animals(self):

        animals = []

        for item in self.app.livestock_table.get_children():

            values = self.app.livestock_table.item(item, "values")

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

        for item in self.app.livestock_table.get_children():
            v = self.app.livestock_table.item(item, "values")

            inv = v[0]

            livestock[inv] = {
                "inv": inv,
                "group": v[4]
            }

        animals = []

        for item in self.app.ani_ost_table.get_children():
            v = self.app.ani_ost_table.item(item, "values")

            inv = v[1]
            mass = int(v[4]) if v[4] else 0

            if mass <= 0:
                continue

            animals.append({
                "account": v[0],
                "group": livestock[inv]["group"],
                "inv": inv,
                "warehouse": v[3],
                "mass": mass
            })

        return animals
    
    def get_milk_animals(self):

        livestock = {}

        for item in self.app.livestock_table.get_children():
            v = self.app.livestock_table.item(item, "values")

            inv = v[0]
            group = v[4]

            if group == "Дойная корова":

                livestock[inv] = {
                    "inv": inv,
                    "group": v[4]
                }

        animals = []

        for item in self.app.ani_ost_table.get_children():
            v = self.app.ani_ost_table.item(item, "values")

            inv = v[1]

            if inv not in livestock:
                continue

            animals.append({
                "account": v[0],
                "group": livestock[inv]["group"],
                "inv": inv,
                "warehouse": v[3]
            })

        return animals

    def get_employees(self):

        employees = []

        emp_items = self.app.employee_table.get_children()
        dog_items = self.app.dog_emp_table.get_children()

        for emp_item, dog_item in zip(emp_items, dog_items):

            emp = self.app.employee_table.item(emp_item, "values")
            dog = self.app.dog_emp_table.item(dog_item, "values")

            employees.append({
                "fio": emp[0],
                "work": dog[3],
                "department": dog[2],
                "salary": dog[4]
            })

        return employees
    
    def get_milk(self):

        milk = []

        for item in self.app.material_ost_table.get_children():

            values = self.app.material_ost_table.item(item, "values")

            if values[0] != "Товарное молоко":
                continue

            milk.append({
                "qty": values[3],
                "count": values[7]
            })

        return milk

    def get_tractors(self):

        tractors = []

        for item in self.app.machine_table.get_children():

            values = self.app.machine_table.item(item, "values")

            tractors.append({
                "name": values[0]
            })

        return tractors

    def get_fields(self):

        fields = []

        for item in self.app.posev_table.get_children():

            values = self.app.posev_table.item(item, "values")

            fields.append({
                "name": values[0],
                "area": values[5]
            })

        return fields
    
    def get_materials(self):

        materials = []

        for item in self.app.material_ost_table.get_children():

            values = self.app.material_ost_table.item(item, "values")

            materials.append({
                "name": values[0]
            })

        return materials

    # ЖИВОТНОВОДСТВО

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

        self.clear_right()

        tk.Label(
            self.right_frame,
            text="Документ: Оприходование",
            font=("Arial", 12, "bold")
        ).pack(pady=10)

        columns = [
            "Дата",
            "Подразделение",
            "Вид движения",
            "Номенклатура (группа)",
            "Количество голов",
            "Инвентарный номер",
            "Масса, кг",
            "Цена, руб"
        ]

        table = self.create_process_table(columns)

        for _ in range(random.randint(12, 20)):

            inv_number = f"КРС-{random.randint(100,999)}"
            ani = random.choice(self.app.animal_data["card"])
            weight = self.get_weight_by_status(ani["status"])
            amount = weight * random.randint(200, 350)

            table.insert("", "end", values=(
                self.app.generate_date(2025, 2026),
                "Животноводческий комплекс",
                "Оприходование",
                ani["status"],
                "1",
                inv_number,
                weight,
                amount
            ))
        self.adjust_column_widths(table)

    def process_birth(self):

        self.clear_right()

        tk.Label(
            self.right_frame,
            text="Документ: Приплод",
            font=("Arial", 12, "bold")
        ).pack(pady=10)

        columns = [
            "Дата",
            "Счёт затрат",
            "Вид движения животных",
            "Склад",
            "Подразделение",
            "Продукция",
            "Инвентарный номер матери",
            "Инвентарный номер",
            "Количество голов",
            "Масса, кг",
            "Счёт учёта",
            "Пол",
            "Работник"
        ]

        table = self.create_process_table(columns)

        animals = self.get_animals()
        employees = self.get_employees()

        mothers = [
            a for a in animals
            if "Дойная" in a["group"]
        ]

        workers = [
            e for e in employees
            if e["work"] in ["Доярка", "Скотник"]
        ]

        if not mothers or not workers:
            return

        for _ in range(random.randint(5, 12)):

            mother = random.choice(mothers)
            worker = random.choice(workers)
            inv_number = f"КРС-{random.randint(100,999)}"
            product = random.choice([
                "Бычок новорожденный", 
                "Телки новорожденные"
            ])

            sex = "Бычок" if "Бычок" in product else "Телка"

            table.insert("", "end", values=(
                self.app.generate_date(2026, 2026),
                "20.01.02",
                "Приплод",
                "Коровник №5 (телята новорожденные)",
                "Животноводческий комплекс",
                product,
                mother["id"],
                inv_number,
                "1",
                random.randint(25, 45),
                "11.01",
                sex,
                worker["fio"]
            ))
        self.adjust_column_widths(table)

    def get_account(status):

        if status in ["Дойная корова", "Сухостойная корова"]:
            return "01.01"

        return "11.02"

    def process_weight_gain(self):

        self.clear_right()

        tk.Label(
            self.right_frame,
            text="Документ: Привес",
            font=("Arial", 12, "bold")
        ).pack(pady=10)

        columns = [
            "Дата",
            "Счёт затрат",
            "Подразделение",
            "Вид движения животных",
            "Склад",
            "Инвентарный номер",
            "Количество голов",
            "Масса, кг",
            "Счёт учёта"
        ]

        table = self.create_process_table(columns)

        animals = self.get_available_animals()

        if not animals:
            return
        
        count = min(len(animals), random.randint(5, 15))

        selected_animals = random.sample(animals, count)
        
        for animal in selected_animals:

            inv = animal["inv"]

            gain = random.randint(15, 80)
            old_mass = animal["mass"]
            new_mass = old_mass + gain

            table.insert("", "end", values=(
                self.app.generate_date(2026, 2026),
                "20.01.02",
                "Животноводческий комплекс",
                "Привес",
                animal["warehouse"],
                inv,
                "1",
                new_mass,
                animal["account"]
            ))
        self.adjust_column_widths(table)

    def process_transfer(self):

        self.clear_right()

        tk.Label(
            self.right_frame,
            text="Документ: Перевод животных из одной группы в другую",
            font=("Arial", 12, "bold")
        ).pack(pady=10)

        columns = [
            "Дата",
            "Склад до",
            "Номенклатура отправитель",
            "Вид движения животных",
            "Склад",
            "Подразделение",
            "Инвентарный номер",
            "Номенклатура получатель",
            "Количество голов",
            "Масса, кг"
        ]

        table = self.create_process_table(columns)

        group_flow = {
            "Телки новорожденные": "Телки до 1 года",
            "Телки до 1 года": "Нетели (стельные)",
            "Нетели": "Коровы дойные",
            "Бычок новорожденный": "Бычки до 1 года",
            "Бычок до 1 года": "Бычки старше 1 года"
        }

        animals = [
            a for a in self.get_available_animals()
            if a["group"] in group_flow
        ]

        if not animals:
            return

        building_by_group = {
            "Телки до 1 года": ["Коровник №4"],
            "Нетели (стельные)": ["Коровник №2"],
            "Коровы дойные": ["Коровник №1"],
            "Бычки до 1 года": ["Коровник №3", "Коровник №4"],
            "Бычки старше 1 года": ["Коровник №3"]
        }
        
        count = min(len(animals), random.randint(5, 15))

        selected_animals = random.sample(animals, count)

        for animal in selected_animals:

            old_group = animal["group"]
            new_group = group_flow.get(old_group, old_group)

            old_warehouse = animal["warehouse"]
            new_warehouse = random.choice(
                building_by_group.get(new_group, [old_warehouse])
            )

            table.insert("", "end", values=(
                self.app.generate_date(2026, 2026),
                old_warehouse,
                old_group,
                "Переведено из других групп (в другие группы)",
                new_warehouse,
                "Животноводческий комплекс",
                animal["inv"],
                new_group,
                "1",
                animal["mass"]
            ))
        self.adjust_column_widths(table)

    def process_milk_yield(self):

        self.clear_right()

        tk.Label(
            self.right_frame,
            text="Документ: Надой молока",
            font=("Arial", 12, "bold")
        ).pack(pady=10)

        columns = [
            "Дата",
            "Счёт затрат",
            "Склад",
            "Количество доек",
            "Продукция",
            "Инвентарный номер",
            "Количество голов",
            "Надоено молока за день, л"
        ]

        table = self.create_process_table(columns)

        animals = self.get_milk_animals()

        for ani in animals:

                table.insert("", "end", values=(
                self.app.generate_date(2026, 2026),
                "20.01.02",
                ani["warehouse"],
                "1",
                "Молоко",
                ani["inv"],
                "1",
                random.randint(20, 40)
            ))
                
        self.adjust_column_widths(table)

    def process_sale_products(self):

        self.clear_right()

        tk.Label(
            self.right_frame,
            text="Документ: Продажа продукции",
            font=("Arial", 12, "bold")
        ).pack(pady=10)

        milk_columns = [
            "Дата",
            "Номер",
            "Контрагент",
            "Склад",
            "Номенклатура",
            "Количество",
            "Ед. изм.",
            "Цена, руб/л",
            "Сумма, руб",
            "Банковский счёт",
            "Статус"
        ]

        ani_columns = [
            "Дата",
            "Номер",
            "Контрагент",
            "Склад",
            "Инвентарный номер",
            "Масса",
            "Ед. изм.",
            "Цена, руб/кг",
            "Сумма, руб",
            "Банковский счёт",
            "Статус"
        ]

        milk_table = self.create_process_table(milk_columns)
        ani_table = self.create_process_table(ani_columns)

        milk = self.get_milk()

        for i, m in enumerate(milk, 1):

            qty = int(m["qty"])
            price = int(m["count"])

            milk_table.insert("", "end", values=(
                self.app.generate_date(2026, 2026),
                f"{i+1:05d}",
                "АО «Прикамский Молкомбинат»",
                "Молочный блок",
                "Товарное молоко",
                qty,
                "л",
                price,
                qty * price,
                f"{random.randint(100000000, 999999999)} УФК по Пермскому краю",
                random.choice([
                    "Оплачено",
                    "Не оплачено"
                ])
            ))

        animals = self.get_available_animals()

        if animals:

            selected = random.sample(
                animals,
                min(len(animals), random.randint(2, 5))
            )

            start = 1

            for i, animal in enumerate(selected, start):

                mass = int(animal["mass"])
                price = random.randint(220, 320)

                ani_table.insert("", "end", values=(
                    self.app.generate_date(2026, 2026),
                    f"{i:05d}",
                    "ООО «Прикамский Мясокомбинат»",
                    animal["warehouse"],
                    animal["inv"],
                    mass,
                    "кг",
                    price,
                    mass * price,
                    f"{random.randint(100000000, 999999999)} УФК по Пермскому краю",
                    random.choice([
                        "Оплачено",
                        "Не оплачено"
                    ])
                ))

        self.adjust_column_widths(milk_table)
        self.adjust_column_widths(ani_table)

    # РАСТЕНИЕВОДСТВО

    def process_seed_receipt(self):

        self.clear_right()

        tk.Label(
            self.right_frame,
            text="Документ: Оприходование",
            font=("Arial", 12, "bold")
        ).pack(pady=10)

        columns = [
            "Дата",
            "Контагент",
            "Склад",
            "Вид движения",
            "Номенклатура",
            "Количество, кг",
            "Цена, руб/кг",
            "Сумма",
            "Счёт учёта"
        ]

        table = self.create_process_table(columns)

        products = [
            {
                "name": "Хлористый калий",
                "contr": "ООО «Агрохимсервис»",
                "warehouse": "Склад удобрений",
                "account": "10.12.2"
            },

            {
                "name": "Калийная соль",
                "contr": "ООО «Агрохимсервис»",
                "warehouse": "Склад удобрений",
                "account": "10.12.2"
            },

            {
                "name": "Семена овса",
                "contr": "ООО «Семена Прикамья",
                "warehouse": "Зерносклад №1",
                "account": "10.14"
            },

            {
                "name": "Семена пшеницы",
                "contr": "ООО «Семена Прикамья",
                "warehouse": "Зерносклад №1",
                "account": "10.14"
            },

            {
                "name": "Семена кукурузы",
                "contr": "ООО «Зернотрейд»",
                "warehouse": "Зерносклад №1",
                "account": "10.14"
            },

            {
                "name": "Семена ячменя",
                "contr": "ООО «Зернотрейд»",
                "warehouse": "Зерносклад №1",
                "account": "10.14"
            },

            {
                "name": "Суперфосфат",
                "contr": "ООО «Агрохимсервис»",
                "warehouse": "Склад удобрений",
                "account": "10.12.2"
            }
        ]

        for i in range(random.randint(3, 8)):

            prod = random.choice(products)

            if "Семена" in prod["name"]:
                qty = random.randint(20000, 100000) 
                price = random.randint(18, 50)

            elif "Суперфосфат" in prod["name"] or "Калий" in prod["name"]: 
                qty = random.randint(30000, 90000)  
                price = random.randint(40, 90)

            table.insert("", "end", values=(
                self.app.generate_date(2026, 2026),
                prod["contr"],
                prod["warehouse"],
                "Оприходование",
                prod["name"],
                qty,
                price,
                qty * price,
                prod["account"]
            ))
        self.adjust_column_widths(table)

    def process_waybill(self):

        self.clear_right()

        tk.Label(
            self.right_frame,
            text="Документ: Путевой лист + акты списания",
            font=("Arial", 12, "bold")
        ).pack(pady=10)

        top_columns = [
            "Дата",
            "Документ",
            "Подразделение",
            "Сотрудник",
            "Техника",
            "Прицеп",
            "Вид работы",
            "Структура посевных площадей",
            "Единица измерения",
            "Выработано, га",
            "Счёт затрат",
            "Номенклатура",
            "Количество, л"
        ]

        ydob_columns = [
            "Дата",
            "Документ",
            "Подразделение",
            "Сотрудник",
            "Техника",
            "Прицеп",
            "Вид работы",
            "Структура посевных площадей",
            "Единица измерения",
            "Выработано, га",
            "Счёт затрат",
            "Номенклатура (топливо)",
            "Количество, л",
            "Склад",
            "Номенклатура",
            "Количество, кг"
        ]

        top_table = self.create_process_table(top_columns)
        ydob_table = self.create_process_table(ydob_columns)

        employees = self.get_employees()
        tractors = self.get_tractors()
        fields = self.get_fields()

        workers = [e for e in employees if e["work"] == "Тракторист"]
        tractors_only = [t for t in tractors if "трактор" in t["name"].lower()]
        plugs = [t for t in tractors if "плуг" in t["name"].lower()]

        if not workers or not tractors_only  or not fields:
            return

        fert_items = [
            "Хлористый калий",
            "Калийная соль",
            "Суперфосфат"
        ]

        norms = {
            "Вспашка": {"fuel": 15, "seed": 0, "fertilizer": 0}
        }

        norms2 = {
            "Внесение удобрений": {"fuel": 3.5, "seed": 0, "fertilizer": 72},
            "Посев": {"fuel": 3.5, "seed": 190, "fertilizer": 0}
        }

        for i in range(random.randint(2, 5)):

            worker = random.choice(workers)
            tractor = random.choice(tractors_only)
            plug = random.choice(plugs) 
            field = random.choice(fields)

            work = random.choice(list(norms.keys()))
            ha = random.randint(40, 360)

            norm = norms[work]

            fuel = int(ha * norm["fuel"])

            top_table.insert("", "end", values=(
                self.app.generate_date(2026, 2026),
                "Путевой лист",
                "Машино-тракторный парк",
                worker["fio"],
                tractor["name"],
                plug["name"],
                work,
                field["name"],
                "га",
                ha,
                "20.01.1",
                "Дизельное топливо",
                fuel
            ))

        for i in range(random.randint(2, 5)):

            worker = random.choice(workers)
            tractor = random.choice(tractors_only)
            field = random.choice(fields)

            work2 = random.choice(list(norms2.keys()))
            ha = random.randint(40, 360)

            norm2 = norms2[work2]

            fuel = int(ha * norm2["fuel"])
            seed = int(ha * norm2["seed"])
            fertilizer = int(ha * norm2["fertilizer"])

            if work2 == "Посев":
                stock = "Зерносклад №1"
                nomen = "Семена"
                material_qty = seed

            elif work2 == "Внесение удобрений":
                stock = "Склад удобрений"
                nomen = random.choice(fert_items)
                material_qty = fertilizer

            else:
                stock = "-"
                nomen = "-"
                material_qty = "-"

            ydob_table.insert("", "end", values=(
                self.app.generate_date(2026, 2026),
                "Путевой лист",
                "Машино-тракторный парк",
                worker["fio"],
                tractor["name"],
                "-",
                work2,
                field["name"],
                "га",
                ha,
                "20.01.1",
                "Дизельное топливо",
                fuel,
                stock,
                nomen,
                material_qty
            ))

        self.adjust_column_widths(top_table)
        self.adjust_column_widths(ydob_table)

    # ОС

    def process_fuel_receipt(self):

        self.clear_right()

        tk.Label(
            self.right_frame,
            text="Документ: Оприходование",
            font=("Arial", 12, "bold")
        ).pack(pady=10)

        columns = [
            "Дата",
            "Контагент",
            "Склад",
            "Вид движения",
            "Номенклатура",
            "Количество",
            "Цена, руб",
            "Сумма",
            "Счёт учёта",
            "Сотрудник"
        ]

        table = self.create_process_table(columns)

        products = [
            {
                "name": "Фильтр топливный МТЗ-82",
                "contr": "ИП Сидоров В.В.",
                "account": "10.5"
            },

            {
                "name": "Ремень молотилки Claas Lexion 770",
                "contr": "ООО «Сельхозтехника-Центр»",
                "account": "10.5"
            },

            {
                "name": "Бензин АИ-92",
                "contr": "ООО «Нефтепродукт»",
                "account": "10.03.01"
            },

            {
                "name": "Дизельное топливо",
                "contr": "ООО «ПермАгроГСМ»",
                "account": "10.03.01"
            },

            {
                "name": "Масло моторное",
                "contr": "ООО «Зернотрейд»",
                "warehouse": "ООО «ПермАгроГСМ»",
                "account": "10.03.01"
            }
        ]

        employees = self.get_employees()

        workers = [
            e for e in employees
            if e["work"] in ["Инженер-механик", "Слесарь-ремонтник", "Водитель"]
        ]

        for i in range(random.randint(3, 8)):

            prod = random.choice(products)

            if "Фильтр" in prod["name"] or "Ремень" in prod["name"]:
                qty = random.randint(1, 20) 
                price = random.randint(400, 1000)

            elif "Бензин" in prod["name"] or "Дизельное" in prod["name"] or "Масло" in prod["name"]: 
                qty = random.randint(5000, 15000)  
                price = random.randint(50, 70)

            table.insert("", "end", values=(
                self.app.generate_date(2026, 2026),
                prod["contr"],
                "Парк техники",
                "Оприходование",
                prod["name"],
                qty,
                price,
                qty * price,
                prod["account"],
                random.choice(workers)["fio"]
            ))
        self.adjust_column_widths(table)

    def process_salary(self):

        self.clear_right()

        tk.Label(
            self.right_frame,
            text="Документ: Начисление зарплаты",
            font=("Arial", 12, "bold")
        ).pack(pady=10)

        columns = [
            "Номер",
            "Начисление за",
            "Подразделение",
            "Сотрудник",
            "Оклад, руб",
            "НДФЛ, руб",
            "К выдаче, руб"
        ]

        table = self.create_process_table(columns)

        employees = self.get_employees()

        tax_rate = 0.13
        doc_number = 1

        for emp in employees:

            salary = int(emp["salary"]) 

            ndfl = int(salary * tax_rate)
            net = salary - ndfl

            table.insert("", "end", values=(
                f"{doc_number:06d}",
                "Апрель 2026",
                emp["department"],
                emp["fio"],
                salary,
                ndfl,
                net
            ))

            doc_number += 1

        self.adjust_column_widths(table)
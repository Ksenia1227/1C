const express = require('express')
const app = express()
require ('dotenv').config()
const cors = require('cors')
app.use(express.json())
// app.use(express.urlencoded({ extended: true }))
app.use(cors({ origin: ["http://localhost:8080"] }));
const port = process.env.PORT

app.use((req, res, next) => {
    console.log(req.method, req.body)
    next()
})

//   const { get_auths_table } = require('./models/auths')
//  const { get_users_table } = require('./models/user')
//  const { get_account_table } = require('./models/account')
//  const { get_entity_type_table } = require('./models/entity_type')
//  const { get_nomenclature_type_table } = require('./models/nomenclature_type')
//  const { get_unit_table } = require('./models/unit') 
//  const { get_organization_table } = require('./models/organization')
//  const { get_group_culture_table } = require('./models/group_culture')
//  const { get_position_table } = require('./models/position')
//  const { get_crop_table } = require('./models/crop')
//  const { get_division_table } = require('./models/division')
//  const { get_field_table } = require('./models/field')
//  const { get_nomenclature_table } = require('./models/nomenclature')
//  const { get_structure_acreage_table } = require('./models/structure_acreage')
// const { get_animal_group_table } = require('./models/animal_group');
// const { get_animal_table } = require('./models/animal');
// const { get_balance_card_animal_table } = require('./models/balance_card_animal');
// const { get_counterparty_table } = require('./models/counterparty');
// const { get_contract_counterparty_table } = require('./models/contract_counterparty');
// const { get_employee_table } = require('./models/employee');
// const { get_contract_employee_table } = require('./models/contract_employee');
// const { get_balance_card_good_table } = require('./models/balance_card_good');
// const { get_building_table } = require('./models/building');
// const { get_fixed_asset_table } = require('./models/asset');
// const { get_balance_card_plant_table } = require('./models/balance_card_plant');


// const { get_offspring_table } = require('./models/off_spring');
// const { get_weight_gain_table } = require('./models/weight_gain');
// const { get_animal_transfer_table } = require('./models/animal_transfer');
// const { get_milking_table } = require('./models/milking');
// const { get_feed_write_off_table } = require('./models/feed_write_off');
// const { get_feed_write_off_item_table } = require('./models/feed_write_off_item');

// const { get_product_sale_table } = require('./models/product_sale');
// const { get_goods_receipt_table } = require('./models/goods_receipt');
// const { get_registration_animal_table } = require('./models/registration_animal');
// const { get_movement_table } = require('./models/movement');

// const { get_progress_table } = require('./models/progress');
// const { get_work_type_table } = require('./models/work_type');
// const { get_waybill_table } = require('./models/way_bill');
// const { get_fuel_write_off_table } = require('./models/fuel_write_off');
// const { get_fertilizer_write_off_table } = require('./models/fertilizer_write_off');

//  async function initTables() {
//   try {
//       await get_auths_table();  
//       await get_users_table();  
//       await get_account_table();
//       await get_entity_type_table();
//       await get_nomenclature_type_table();
//       await get_unit_table();
//       await get_position_table();
       
//       await get_organization_table();
//       await get_division_table(); 
//       await get_group_culture_table(); 
//       await get_crop_table();
//       await get_field_table();
//       await get_nomenclature_table();
//       await get_structure_acreage_table();
//       await get_animal_group_table();
//       await get_animal_table();
//       await get_counterparty_table();
//       await get_building_table();
//       await get_contract_counterparty_table();
//       await get_employee_table();
//       await get_contract_employee_table();
//       await get_balance_card_animal_table();
//       await get_balance_card_good_table(); 
//       await get_fixed_asset_table();
//       await get_balance_card_plant_table(); 

//       await get_movement_table(); 
//       await get_offspring_table();
//       await get_weight_gain_table();
//       await get_animal_transfer_table();
//       await get_milking_table();
//       await get_feed_write_off_table();
//       await get_feed_write_off_item_table();
//       await get_product_sale_table();
//       await get_goods_receipt_table(); 
//       await get_registration_animal_table();

//       await get_progress_table();
//       await get_work_type_table();
//       await get_waybill_table();
//       await get_fuel_write_off_table();
//       await get_fertilizer_write_off_table();
      
//       console.log('Все таблицы созданы');
//   } catch (error) {
//       console.error('Ошибка при создании  таблиц:', error);
//   }
// }

// async function initTables() {
//   try {
//     await get_section_table();
//     console.log('Все таблицы обновлены');
//   } catch (error) {
//     console.error('Ошибка при создании таблиц:', error);
//   }
// }
// initTables();

// app.use(cors({origin:'*'}))

const auths_routes = require('./routes/auths')
const users_routes = require('./routes/users')
const general_data_routes = require('./routes/general_data')
const plants_routes = require('./routes/plants')
const assets_routes = require('./routes/assets')
const animal_routes = require('./routes/animal')
// const unit_routes = require('./routes/unit')
const generator_routes = require('./routes/generator')
const path = require("path")

app.use('/api/auth', auths_routes)
app.use('/api/user', users_routes)
app.use('/api/g_data', general_data_routes)
app.use('/api/plants', plants_routes)
app.use('/api/building', assets_routes)
app.use('/api/animal', animal_routes)
app.use('/api/generator', generator_routes)

app.use((error, request, response, next) => {
    if (error instanceof SyntaxError)
        return response.status(400).send({ message: 'not valid data' })
    else
        next()
})

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})
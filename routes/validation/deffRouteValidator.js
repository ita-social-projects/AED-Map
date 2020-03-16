const { body } = require('express-validator');
const {
  PRESENT,
  MISSING,
  PRESENT_IN_BUILDING,
  PRESENT_NEAR_APPLIANCE
} = require('../../consts/informational_plate_state');

const deffValidationRules = () => {
  return [
    body('title')
      .notEmpty()
      .withMessage('Поле обов\'язкове'),
    body('address')
      .notEmpty()
      .withMessage('Поле обов\'язкове'),
    body('accessibility')
      .notEmpty()
      .withMessage('Поле обов\'язкове'),
    body('phone')
      .custom((phones) => {
        phones.map((value) => {
          if (
            !value.match(
              /^[\+]?[(]?[0-9]{3}[)]?[-\s\.]?[(]?[0-9]{2}[)]?[-\s\.]?[0-9]{3}[-\s)\.]?[0-9]{2}[-\s)\.]?[0-9]{2}$/im
            )
          )
            throw new Error(
              'невірний формат телефонного номера'
            );
        });
        return true;
      }),
    body('informational_plates')
      .notEmpty()
      .withMessage('Поле обов\'язкове')
      .custom((value) => {
        if (
          !value.match(
            new RegExp(
              `^${PRESENT}$|^${MISSING}$|^${PRESENT_IN_BUILDING}$|^${PRESENT_NEAR_APPLIANCE}$`
            )
          )
        ) {
          throw new Error(
            'Даного варіанту розміщення підказок не існує'
          );
        }
        return true;
      }),
    body('storage_place')
      .notEmpty()
      .withMessage('Поле обов\'язкове')
      .custom((value) => {
        if (!value.match(/^Поверх ((1?[0-9])|20),.+$/))
          throw new Error('Формат розміщення некоректний');
        return true;
      }),
    body('actual_date')
      .notEmpty()
      .withMessage('Поле обов\'язкове')
      .custom((value) => {
        if (!value.match(/^\d{4}-\d{2}-\d{2}$/))
          throw new Error('Формат дати некоректний');

        return true;
      }),
    body('location')
      .notEmpty()
      .withMessage('Поле обов\'язкове')
      .custom((value) => {
        let errors = [];
        if (value.type != 'Point')
          errors.push(
            'Обєкт location повинен містити атрибут value зі значенням Point'
          );
        if (
          value.coordinates.length != 2 ||
          typeof value.coordinates[0] != 'number' ||
          typeof value.coordinates[1] != 'number'
        )
          errors.push('Невірний формат запису координат');
        if (errors.length)
          throw new Error(errors.join(', '));

        return true;
      })
  ];
};

module.exports = {
  deffValidationRules
};

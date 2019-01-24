export const required = value => value ? undefined : 'Required';
export const nonEmpty = value =>
    value.trim() !== '' ? undefined : 'Cannot be empty';
export const startEndWithSpace = value =>
    value.trim() === value ? undefined : 'Cannot have space at the begining or end'
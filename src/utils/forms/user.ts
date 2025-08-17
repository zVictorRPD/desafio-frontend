import * as Yup from 'yup';

export const filterInitialValues = {
    nome: '',
    sobrenome: '',
    email: '',
}

export const filterValidationSchema = Yup.object().shape({
    nome: Yup.string(),
    sobrenome: Yup.string(),
    email: Yup.string().email('Email inválido'),
});
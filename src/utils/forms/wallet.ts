import * as Yup from 'yup';

export const initialValues = {
    nome: '',
    sobrenome: '',
    email: '',
    valor: 0,
}

export const validationSchema = Yup.object().shape({
    nome: Yup.string().required('Nome é obrigatório'),
    sobrenome: Yup.string().required('Sobrenome é obrigatório'),
    email: Yup.string().email('Email inválido').required('Email é obrigatório'),
    valor: Yup.number().typeError('Valor deve ser um número').required('Valor é obrigatório'),
});

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
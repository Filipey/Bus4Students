import { SetStateAction, useState, useEffect } from 'react';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import Radio from '@material-ui/core/Radio';
import RadioGroup from '@material-ui/core/RadioGroup';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Bus from '../../img/onibusExemplo.jpeg'
import * as S from './style'
import { FormLabel } from '@material-ui/core';


export default function Register() {

    const [password, setPassword] = useState<string>(" ");
    const [cpf, setCpf] = useState<string>(" ");
    const [nome, setNome] = useState<string>(" ");
    const [passwordConfirm, setPasswordConfirm] = useState<string>(" ");
    const [passwordAux, setPasswordAux] = useState<boolean>();
    const [value, setValue] = useState<string>("usuario");
    const [error, setError] = useState<string>(" ");

    function validatePassword() {
        if (password != passwordConfirm) {
            setError("As senhas não conferem!")
            setPasswordAux(false)
        } else {
            setError(" ")
            setPasswordAux(true)
        }
    }

    useEffect(() => {
        validatePassword()
    }, [passwordConfirm, password]);

    const handleChange = (event: { target: { value: SetStateAction<string>; }; }) => {
        setValue(event.target.value);
    };

    return (
        <S.Container>
            <S.BusImg src={Bus} />
            <S.Form>
                <S.TitleLogin>Cadastrar</S.TitleLogin>
                <TextField
                    variant="outlined"
                    margin="normal"
                    required
                    fullWidth
                    id="name"
                    label="Nome"
                    name="email"
                    autoFocus
                    onChange={(e) => setNome(e.target.value)}
                />
                <TextField
                    variant="outlined"
                    margin="normal"
                    required
                    fullWidth
                    id="cpf"
                    label="CPF"
                    name="email"
                    onChange={(e) => setCpf(e.target.value)}
                />
                <TextField
                    variant="outlined"
                    margin="normal"
                    required
                    fullWidth
                    name="password"
                    label="Insira sua senha"
                    type="password"
                    id="password"
                    autoComplete="current-password"
                    onChange={(e) => setPassword(e.target.value)}
                />
                <TextField
                    variant="outlined"
                    margin="normal"
                    required
                    fullWidth
                    name="password"
                    label="Confirme sua senha"
                    type="password"
                    id="password"
                    autoComplete="current-password"
                    onChange={(e) => setPasswordConfirm(e.target.value)}
                />
                <FormLabel component="legend">Selecione o tipo de cadastro: </FormLabel>
                <RadioGroup aria-label="quiz" name="quiz" value={value} onChange={handleChange}>
                    <FormControlLabel value="usuario" control={<Radio color='primary' />} label="Usúario" />
                    <FormControlLabel value="administrador" control={<Radio color='primary' />} label="Administrador" />
                </RadioGroup>

                <Button
                    type="submit"
                    fullWidth
                    variant="contained"
                    color="primary"
                >
                    Cadastrar
                </Button>
                <S.InfoContainer>
                    <S.Info href='/'>
                        {/* Esqueceu sua senha? */}
                    </S.Info>
                    <S.Info href='/login'>
                        Já é cadastrado? Entrar
                    </S.Info>
                </S.InfoContainer>
                <S.ErrorPassword>{error}</S.ErrorPassword>
            </S.Form>
        </S.Container>
    )
}
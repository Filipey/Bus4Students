import { useState } from 'react';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import Bus from '../../img/onibusExemplo.jpeg'

import * as S from "./style"


export default function LoginContainer() {

    const [cpf, setCpf] = useState<string>(" ");
    const [password, setPassword] = useState<string>(" ");

    return (
        <S.Container>
            <S.BusImg src={Bus} />
            <S.Form>
                <S.TitleLogin>Entrar</S.TitleLogin>
                <TextField
                    variant="outlined"
                    margin="normal"
                    required
                    fullWidth
                    id="cpf"
                    label="CPF"
                    name="cpf"
                    // autoComplete="email"
                    autoFocus
                    onChange={(e) => setCpf(e.target.value)}
                />
                <TextField
                    variant="outlined"
                    margin="normal"
                    required
                    fullWidth
                    name="password"
                    label="Senha"
                    type="password"
                    id="password"
                    autoComplete="current-password"
                    onChange={(e) => setPassword(e.target.value)}
                />
                <Button
                    type="submit"
                    fullWidth
                    variant="contained"
                    color="primary"
                >
                    Entrar
                </Button>
                <S.InfoContainer>
                    <S.Info href=''>
                        {/* Esqueceu sua senha? */}
                    </S.Info>
                    <S.Info href='/register'>
                        Cadastrar
                    </S.Info>
                </S.InfoContainer>
            </S.Form>
        </S.Container>
    );
}
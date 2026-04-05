import { useCallback } from 'react';

/**
 * Mapeamento de senhas por grau.
 * Cada grau tem uma pergunta ritual e uma senha (case-sensitive, maiúsculas).
 */
const SENHAS_GRAUS = {
    1: { pergunta: 'Sois maçom?', senha: 'MICTMR' },
    2: { pergunta: 'Sois Companheiro Maçom?', senha: 'EVAEF' },
    3: { pergunta: 'Sois Mestre Maçom?', senha: 'PROVISORIA' }
};

/**
 * Hook de controle de acesso por grau com "Challenge-Response" estrito (ZERO TRUST).
 * Nenhum dado de senha é salvo (nem em state, nem em sessionStorage).
 * Toda vez que o usuário acessar, deverá fornecer a senha novamente.
 */
export const useGrauAccess = (userGrau) => {

    /**
     * Verifica a senha digitada contra a senha correspondente ao grau.
     */
    const verifyPassword = useCallback((grau, senhaDigitada) => {
        const config = SENHAS_GRAUS[grau];
        if (!config) return false;
        return senhaDigitada === config.senha;
    }, []);

    /**
     * Retorna a configuração da pergunta para um determinado grau.
     */
    const getGrauConfig = useCallback((grau) => {
        return SENHAS_GRAUS[grau] || null;
    }, []);

    /**
     * Como é "Zero trust", TODOS os cliques em conteúdo exigem desafio de senha.
     * Retorna "true" incondicionalmente para forçar a tela.
     */
    const needsPasswordChallenge = useCallback((itemGrau) => {
        return true;
    }, []);

    return {
        verifyPassword,
        getGrauConfig,
        needsPasswordChallenge,
        SENHAS_GRAUS
    };
};

export default useGrauAccess;

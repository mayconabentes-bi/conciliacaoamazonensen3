// ═══════════════════════════════════════════════
// CENTRAL DE CONTEÚDO (Mapeamento Pré-CMS)
// ═══════════════════════════════════════════════

export const CONTENT = {
    version: '2.5.3', // Added image to Clube das Acacias and professional icons to Academia
    hero: {
        slides: [
            {
                tag: 'Oriente de Manaus · Desde 1894',
                title: 'Construindo uma sociedade',
                strong: 'com Integridade',
                description: 'Honestidade, confiabilidade e princípios sólidos formam a base de um caráter virtuoso. A Maçonaria cultiva esses valores em cada irmão, gerando homens de palavra e ação.',
                btnText: 'Descobrir a Maçonaria',
                btnLink: '#historia-maçonaria',
                value: 'Integridade'
            },
            {
                tag: 'Fraternidade Universal',
                title: 'Uma base comum para',
                strong: 'Amizade Verdadeira',
                description: 'A Maçonaria oferece a seus membros a oportunidade de construir amizades profundas e duradouras com pessoas de diferentes origens, unidas por valores e propósitos comuns.',
                btnText: 'Conhecer a Loja',
                btnLink: '#historia',
                value: 'Amizade'
            },
            {
                tag: 'Diversidade · Inclusão · Harmonia',
                title: 'Tratar cada um com',
                strong: 'Respeito e Dignidade',
                description: 'Desde suas origens, a Maçonaria respeita as crenças de seus membros. Um espaço onde diferentes origens convergem, cultivando tolerância e harmonia genuína.',
                btnText: 'Nossos Valores',
                btnLink: '#valores',
                value: 'Respeito'
            },
            {
                tag: 'Impacto Social · Amazônia',
                title: 'Criando impacto através do',
                strong: 'Serviço Comunitário',
                description: 'Participar de eventos, arrecadar fundos para causas sociais ou voluntariar em organizações comunitárias — o serviço está no coração da Maçonaria Amazonense.',
                btnText: 'Instituto Social',
                btnLink: '#instituto',
                value: 'Serviço'
            }
        ]
    },
    intro: {
        welcome: 'Sejam Bem-vindos ao site institucional da',
        title: 'Grande Benemérita Loja Simbólica',
        emphasized: 'Conciliação Amazonense Nº 3',
        highlight: '"A Maçonaria é uma instituição essencialmente filosófica, filantrópica, educativa e progressista."',
        sections: [
            {
                title: 'Nossa Natureza',
                content: 'Nossa Loja constitui-se como uma associação de homens livres e de bons costumes, unidos pelo desejo comum de aperfeiçoamento moral e intelectual. Baseamos nossa conduta na tolerância, na busca pela verdade e no respeito às leis e à família.'
            },
            {
                title: '2. Princípios e Valores',
                content: 'Nossa atuação é norteada por pilares que resistem ao tempo:',
                bullets: [
                    { title: 'Ética e Moral', text: 'O exercício constante das virtudes como base para a conduta humana.' },
                    { title: 'Fraternidade', text: 'O reconhecimento de que todos os seres humanos são iguais em direitos e deveres.' },
                    { title: 'Liberdade de Pensamento', text: 'O estímulo à investigação da verdade, livre de dogmas ou preconceitos.' },
                    { title: 'Evolução Social', text: 'O compromisso com o progresso da humanidade através do exemplo individual e da assistência mútua.' }
                ]
            },
            {
                title: '3. A Tradição e o Futuro',
                content: 'A preservação de nossa instituição depende da transmissão de conhecimento entre gerações. Valorizamos a experiência dos que nos precederam, ao mesmo tempo em que reconhecemos a importância da renovação constante de nosso quadro.\n\nBuscamos a convergência de indivíduos que possuam retidão de caráter e uma disposição genuína para o trabalho em favor da coletividade. Acreditamos que o ingresso de novos membros, dotados de espírito crítico e compromisso ético, é o que garante a vitalidade de nossos ideais e a continuidade de nossas tradições seculares.'
            },
            {
                title: '4. Contato e Informação',
                content: 'A Maçonaria não realiza convites públicos ou proselitismo. No entanto, mantemos este canal para prestar esclarecimentos sobre nossa natureza institucional e nossas ações de caráter social. Para aqueles que buscam compreender os fundamentos que regem nossa Ordem, as portas do diálogo institucional permanecem abertas.'
            }
        ],
        btnPrimary: 'Descobrir mais',
        btnGhost: 'Nossa História'
    },
    history: {
        tag: 'Nossa Trajetória',
        title: 'Uma História de Tradição no coração da Amazônia',
        image: '/assets/history/fundadores_v2.jpg',
        paragraphs: [
            'Acalentando o sonho de expansão na jurisdição, inspirados nos ensinamentos maçônicos e na firme decisão, sempre com o norte apontado para a trilogia que caracteriza a Maçonaria: “Liberdade, Igualdade e Fraternidade”, Conciliação Amazonense nº 3, idealizada para contornar e aparar pequenas arestas entre Irmãos de Lojas coirmãs, foi fundada em 30 de novembro de 1894 e regularizada em 21 de maio de 1895, sendo a 3ª Loja Maçônica mais antiga na cidade de Manaus/AM.',
            'O fato histórico seu deu quando 13 valorosos Irmãos, capitaneados pelo Pod∴ Ir∴ Dr. Antonio Pereira de Sá Peixoto, o Barão do Juruá, Membro ativo da Augusta e Benemérita Loja Capitular Ganganelli, do Or∴ do Rio de Janeiro e da Augusta e Respeitável Loja Simbólica Henrique Valadares, obtiveram a graça do Poder Central para a fundação dessa nova coluna, que já prenunciava o apaziguamento e o crescimento da instituição em nosso Estado.',
            'Fato digno de registro para conhecimento da Jurisdição, foi que após denominarem, a Loja recém fundada como “Conciliação”, haja vista um dos objetivos de sua fundação, verificaram que já havia no Estado de Pernambuco uma Loja, fundada anteriormente, com essa mesma denominação. Assim, por unanimidade, os fundadores, acrescentaram-lhe a palavra “amazonense”, diferenciando-a, portanto, da coirmã pernambucana. Assim surgiu a denominação CONCILIAÇÃO AMAZONENSE Nº 3, por ser, como apontado ao norte, a terceira Loja fundada em Manaus.',
            'Conciliação Amazonense iniciou seus trabalhos e teve sua sede provisória localizada na Rua José Paranaguá, até transferir-se para sua sede própria na Rua Dr. Almino, no Centro desta capital onde se situa seu majestoso Templo. Uma Loja centenária que ao longo do tempo vem prestando inestimáveis serviços em prol da sociedade.',
            'O primeiro Venerável desta oficina foi o Pod∴ Ir∴ Antonio Gonçalves Pereira de Sá Peixoto. Hoje, o Venerável Mestre é o Pod∴ Ir∴ Eduardo Cesar Oliveira Souza, tendo como Vigilantes os Irmãos Haildo Jarbas Rodrigues e Sávio José Fernandes da Silva.'
        ],
        pillars: [
            'Tolerância e respeito — radicais em um mundo marcado por conflitos',
            'Meritocracia, numa época em que o nascimento determinava o sucesso',
            'Elevados padrões de civilidade interpessoal e filosófica',
            'Educação científica, humanista e artística',
            'Aperfeiçoamento pessoal e social contínuo'
        ],
        timeline: [
            {
                year: 'Fundação',
                title: 'Instalação no Oriente de Manaus',
                desc: 'A Loja recebe o número 3, marcando sua posição entre as mais antigas do Amazonas. Fundadores de differentes origens se unem pelo ideal maçônico.'
            },
            {
                year: 'Consolidação',
                title: 'Referência Filosófica Regional',
                desc: 'A loja consolida-se como centro de estudos filosóficos e filantrópicos, contribuindo decisivamente para o desenvolvimento da Maçonaria na região Norte.'
            },
            {
                year: 'Instituto Social',
                title: 'Criação do Braço Social',
                desc: 'A dimensão filantrópica ganha estrutura formal. Projetos educacionais e de assistência passam a impactar diretamente famílias da comunidade manauara.'
            },
            {
                year: 'Presente',
                title: 'Renovação e Plataforma Digital',
                desc: 'A loja abraça a era digital, ampliando seu alcance filosófico e comunitário. A Academia Filosófica passa a publicar conteúdo aberto para toda a região.'
            }
        ]
    },
    historyGeneral: {
        tag: 'A Arte Real através dos Séculos',
        title: 'Uma Perspectiva Histórica da Maçonaria',
        intro: 'A Maçonaria é frequentemente definida como um sistema de moralidade velado em alegorias. Contudo, para além do simbolismo, ela representa uma das mais longevas instituições da história humana, tendo desempenhado um papel crucial na evolução do pensamento ético, científico e social no mundo.',
        sections: [
            {
                title: '1. A Gênese Operativa: O Canteiro de Obras',
                content: 'A origem da Maçonaria remonta às corporações de ofício da Idade Média. Os "pedreiros livres" (do inglês free-masons) eram os arquitetos e construtores das grandes catedrais europeias. Detentores de conhecimentos avançados em geometria e arquitetura, esses homens organizavam-se em Lojas para garantir a qualidade técnica e a proteção mútua dos membros.\n\nNeste período, as ferramentas que hoje conhecemos simbolicamente — como o Esquadro, o Compasso e o Nível — eram instrumentos físicos utilizados para transformar a pedra bruta em pedra polida, garantindo que as estruturas fossem sólidas e elevadas.'
            },
            {
                title: '2. A Transição Especulativa (Século XVII - XVIII)',
                content: 'Com o declínio das grandes construções góticas, as Lojas passaram a admitir membros que não eram construtores de ofício, mas intelectuais, filósofos e nobres atraídos pela ética e pelo espírito de fraternidade das guildas.\n\nO marco da Maçonaria Moderna ocorreu em 24 de junho de 1717, em Londres, com a fundação da primeira Grande Loja. A partir deste momento, a Maçonaria deixou de construir templos de pedra para dedicar-se à construção social e moral. A "Arte Real" passou a ser o aprimoramento do caráter humano, visando o progresso da humanidade.'
            },
            {
                title: '3. A Maçonaria e o Nascimento da Modernidade',
                content: 'O século XVIII viu a Ordem se tornar o berço de ideais que moldariam o mundo contemporâneo. Pautada pelo Iluminismo, a Maçonaria ofereceu um espaço de igualdade onde homens de diferentes crenças e origens podiam debater a liberdade e a tolerância.\n\nEssa influência foi determinante em eventos como:\n\n• A Independência das Américas, liderada por nomes imortalizados na história;\n\n• O desenvolvimento das Artes e Ciências Liberais, promovendo a educação como ferramenta de libertação;\n\n• A consolidação de valores como a Fraternidade Universal, transcendendo barreiras geográficas e políticas.'
            },
            {
                title: '4. Compromisso com o Futuro',
                content: 'Atualmente, a Maçonaria permanece como uma sociedade discreta, dedicada ao autoaperfeiçoamento e à filantropia. Sob a égide do Grande Arquiteto do Universo, os maçons continuam a trabalhar no silêncio e na retidão, buscando ser exemplos de cidadania e ética.\n\nA história da Maçonaria não é um registro estático do passado, mas um processo contínuo. Cada membro é convidado a ser um operário na construção de uma sociedade mais justa, consciente de que o verdadeiro templo que se ergue é aquele que reside no coração do homem e na harmonia da sociedade.'
            }
        ],
        footer: 'Publicado pela Assessoria de Comunicação da G.B.L.S. Conciliação Amazonense Nº 3'
    },
    historyBrazil: {
        tag: 'História Nacional',
        title: 'Breve História da Maçonaria no Brasil',
        intro: 'A Maçonaria desempenhou um papel fundamental na construção da identidade política e social do Brasil. Mais do que uma sociedade fraternal, a Ordem funcionou como um catalisador de ideais iluministas, influenciando desde os movimentos de independência até a consolidação da República.',
        sections: [
            {
                title: '1. As Origens e o Período Colonial',
                content: 'Embora existam registros de maçons vivendo no Brasil no século XVIII, a primeira loja regular, a "Reunião", foi fundada em 1801 no Rio de Janeiro. Diferente das lojas europeias, que muitas vezes focavam no debate filosófico, a maçonaria brasileira nasceu com um forte viés político-libertário.\n\nSob a influência das Revoluções Americana e Francesa, as lojas tornaram-se centros de discussão contra o domínio colonial. O movimento mais emblemático desse período foi a Inconfidência Mineira (1789), onde diversos membros, inspirados por ideais de liberdade, planejaram a ruptura com Portugal.'
            },
            {
                title: '2. A Independência e a Organização da Ordem',
                content: 'O ano de 1822 é o marco da estruturação administrativa da Ordem no país. A maçonaria foi o braço articulador que uniu a elite intelectual e política em prol da emancipação.\n\n• D. Pedro I: Iniciado na Ordem sob o nome simbólico de "Guatimozim", o Imperador chegou a ocupar o cargo de Grão-Mestre.\n\n• José Bonifácio: O "Patriarca da Independência" também foi uma figura central, embora tenha tido divergências com o Imperador que levaram à suspensão temporária dos trabalhos em 1822.'
            },
            {
                title: '3. O Segundo Reinado e a Questão Religiosa',
                content: 'Durante o governo de D. Pedro II, a Maçonaria consolidou sua influência na política e no judiciário. No entanto, a década de 1870 foi marcada pela Questão Religiosa, um conflito entre a Igreja Católica (apoiada pela bula Quanta Cura do Papa Pio IX) e a Maçonaria. O Estado, que detinha o poder do Padroado, entrou em choque com bispos que tentavam proibir a presença de maçons em irmandades religiosas, resultando em uma crise diplomática e política que enfraqueceu as bases da monarquia.'
            },
            {
                title: '4. Abolicionismo e República',
                content: 'A Maçonaria foi uma das frentes mais ativas na luta pelo fim da escravidão. Lojas em todo o país compravam cartas de alforria e pressionavam o parlamento por leis abolicionistas.\n\nNa transição para a República (1889), a influência foi decisiva. Marechal Deodoro da Fonseca, o proclamador da República, era Grão-Mestre da Ordem. A bandeira nacional, com suas cores e geometria, carrega simbolismos que muitos historiadores associam aos ideais de ordem e progresso defendidos por membros da fraternidade na época.'
            },
            {
                title: '5. A Maçonaria Contemporânea',
                content: 'Atualmente, a Maçonaria no Brasil é composta por potências regulares de alto prestígio, sendo a GLOMAM e a CMSB referências de excelência e tradição. A instituição mantém seu caráter filosófico e filantrópico, focando em projetos sociais e na formação ética de seus membros, preservando um legado de mais de dois séculos na história nacional.'
            }
        ],
        footer: 'Publicado pela Assessoria de Comunicação da G.B.L.S. Conciliação Amazonense Nº 3'
    },
    historyAmazonas: {
        tag: 'História Regional',
        title: 'Maçonaria no Amazonas',
        intro: 'A Maçonaria no Amazonas desempenhou um papel fundamental não apenas na esfera espiritual e filosófica, mas como um motor de progresso social e intelectual, especialmente durante o Ciclo da Borracha. Em Manaus, a presença maçônica é um testemunho vivo da história da "Paris dos Trópicos".',
        sections: [
            {
                title: 'O Berço da Ordem no Amazonas',
                content: 'A história da Maçonaria no estado remonta ao século XIX. O marco inicial mais significativo foi a fundação da Loja Maçônica Esperança e Porvir n.º 1, em 1872. Localizada no centro histórico de Manaus, ela é a "Loja Mãe" da região e serviu como ponto de encontro para a elite intelectual, política e comercial da época.\n\nMuitos dos ideais republicanos e abolicionistas que circularam em Manaus foram gestados dentro dos templos maçônicos. O Amazonas, inclusive, foi a segunda província do Brasil a libertar seus escravos (em 1884, quatro anos antes da Lei Áurea), um movimento fortemente impulsionado por líderes maçons locais.'
            },
            {
                title: 'Influência Urbana e Arquitetônica',
                content: 'Caminhar pelo centro de Manaus é, em muitos aspectos, ler uma simbologia discreta. A influência da Ordem está presente em:\n\n• Palácio Maçônico: Sede da Grande Loja Maçônica do Amazonas (GLOMAM), um edifício que preserva a arquitetura neoclássica e guarda registros históricos valiosos da fundação da cidade.\n\n• Filantropia e Educação: A Maçonaria amazonense foi responsável pela criação de diversas instituições de ensino, hospitais e programas de assistência social que ajudaram a estruturar a sociedade manauara em tempos de rápido crescimento demográfico.'
            },
            {
                title: 'A Maçonaria Hoje em Manaus',
                content: 'Atualmente, a Maçonaria no Amazonas é representada por potências regulares que trabalham em harmonia e reconhecimento mútuo, tendo a GLOMAM (Grande Loja Maçônica do Amazonas) como um de seus pilares fundamentais.\n\nA instituição mantém seu vigor através de:\n\n• Ações Sociais: Apoio a abrigos, creches e campanhas de saúde pública.\n\n• Preservação Cultural: Manutenção de templos históricos que fazem parte do patrimônio arquitetônico do estado.\n\n• Desenvolvimento Ético: Foco na formação de lideranças que atuam sob os princípios da Liberdade, Igualdade e Fraternidade.'
            },
            {
                title: 'Reflexão Final',
                content: 'Em Manaus, ser maçom historicamente significou estar na vanguarda das mudanças. Desde a iluminação pública (a primeira do Brasil) até as grandes reformas urbanas, a "mão do pedreiro" deixou marcas indeléveis na capital amazonense.'
            }
        ],
        footer: 'Publicado pela Assessoria de Comunicação da G.B.L.S. Conciliação Amazonense Nº 3'
    },
    historyGlomam: {
        tag: 'Institucional',
        title: 'GLOMAM: Tradição e Vanguarda na Maçonaria Amazonense',
        intro: 'A Grande Loja Maçônica do Amazonas (GLOMAM) é uma das instituições mais tradicionais e influentes da Região Norte, sendo reconhecida como a mais antiga das Grandes Lojas brasileiras. Com uma trajetória que se confunde com o desenvolvimento socioeconômico e político do Amazonas, a GLOMAM atua como um pilar de valores éticos, filantropia e preservação histórica.',
        sections: [
            {
                title: '1. Origens e Fundação: O Berço da Regularidade',
                content: 'Fundada oficialmente em 22 de setembro de 1904, a GLOMAM consolidou-se como a pioneira entre as Grandes Lojas do Brasil. Sua gênese remete ao período áureo do Ciclo da Borracha, quando os ideais de liberdade, equality e fraternidade floresciam entre a elite intelectual e comercial de Manaus.\n\nEmbora a Maçonaria já estivesse presente no estado desde 1872 — com a fundação da Loja Esperança e Porvir nº 1 — a organização inicial da maçonaria amazonense (que viria a se tornar a GLOMAM) marcou a independência administrativa e a soberania do rito no estado.'
            },
            {
                title: '2. Protagonismo Histórico e Social',
                content: 'A atuação da GLOMAM sempre extrapolou as paredes dos templos. Ao longo de mais de um século, a instituição foi protagonista em momentos decisivos:\n\n• Abolicionismo: Maçons amazonenses tiveram papel fundamental na extinção da escravidão no estado em 1884, quatro anos antes da Lei Áurea.\n\n• Fundação Dr. Thomas: Uma das mais importantes instituições de amparo ao idoso em Manaus teve sua semente plantada pela maçonaria amazonense (antigo Dispensário Maçônico).\n\n• Desenvolvimento Regional: Figuras como Silvério Nery e Eduardo Ribeiro, que moldaram o Amazonas moderno, faziam parte do quadro da ordem.'
            },
            {
                title: '3. Adaptação à Realidade Amazônica',
                content: 'Um dos marcos mais singulares da GLOMAM é a sua capacidade de adaptação geográfica. A ARLS Glória de Anamã nº 50, por exemplo, possui o único templo maçônico do mundo construído sobre palafitas, permitindo que os trabalhos continuem mesmo durante as grandes cheias do Rio Solimões — um símbolo de resiliência e identidade regional.'
            },
            {
                title: '4. Ações Contemporâneas e Filantropia',
                content: 'Atualmente, sob a gestão de lideranças como o Grão-Mestre Marcelo Peixoto, a GLOMAM mantém um robusto calendário de impacto social:\n\n• Vestibular Social: Projeto que beneficia milhares de estudantes da rede pública com cursos preparatórios.\n\n• Arraial Solidário: Evento anual que arrecada toneladas de alimentos para comunidades em situação de vulnerabilidade.\n\n• Fundação GLOMAM: Braço executivo para projetos de defesa de direitos sociais e assistência humanitária.'
            },
            {
                title: '5. Reconhecimento Internacional',
                content: 'Em 2018, a GLOMAM alcançou o reconhecimento da Grande Loja Unida da Inglaterra (UGLE), a "loja mãe" do mundo. Esse selo de regularidade internacional coloca a maçonaria amazonense em conexão direta com potências globais, facilitando o intercâmbio cultural e filosófico.'
            }
        ],
        attributes: [
            { label: 'Data de Fundação', value: '22 de setembro de 1904' },
            { label: 'Sede', value: 'Manaus, Amazonas' },
            { label: 'Rito Principal', value: 'Rito Escocês Antigo e Aceito (REAA)' },
            { label: 'Lojas Jurisdicionadas', value: 'Aproximadamente 50 (Capital e Interior)' },
            { label: 'Foco Estratégico', value: 'Educação, Filantropia e Ética na Liderança' }
        ],
        footer: 'Publicado pela Assessoria de Comunicação da G.B.L.S. Conciliação Amazonense Nº 3'
    },
    values: {
        tag: 'Nossos Fundamentos',
        title: 'Os Quatro Pilares da Maçonaria',
        description: 'Os valores fundamentais que definem quem somos, pelo que nos pautamos e o que fazemos.',
        cards: [
            {
                num: 'I',
                title: 'Integridade',
                description: 'Honestidade, confiabilidade, honra e responsabilidade formam a base de um caráter virtuoso. Cultivam confiança e revelam o compromisso com princípios sólidos.',
                note: '"Seja em público ou na privacidade, o Maçom age sempre do mesmo modo."'
            },
            {
                num: 'II',
                title: 'Amizade',
                description: 'A Maçonaria proporciona oportunidades para construir amizades profundas e duradouras com pessoas de todas as origens, unidas por interesses e valores comuns.',
                note: '"Irmãos de Loja são irmãos para a vida — na prosperidade e na adversidade."'
            },
            {
                num: 'III',
                title: 'Respeito',
                description: 'Desde seus primórdios, a Maçonaria respeita as crenças de seus membros. Promove um ambiente onde a diversidade é valorizada e onde diferentes origens convergem em harmonia.',
                note: '"Nenhum Maçom é superior a outro dentro do Templo — apenas mais experiente."'
            },
            {
                num: 'IV',
                title: 'Serviço',
                description: 'Participar de eventos, apoiar causas sociais ou voluntariar na comunidade — o serviço está no coração da Maçonaria. Nossos membros contribuem com tempo, recursos e conhecimento.',
                note: '"O serviço é o primeiro ensinamento recebido por todo novo Maçom."'
            }
        ]
    },
    academy: {
        tag: 'Conhecimento',
        title: 'Academia Filosófica',
        articles: [
            {
                icon: 'Compass',
                cat: 'Simbologia REAA',
                title: 'O Painel do Grau de Aprendiz no REAA',
                excerpt: 'Uma análise detalhada sobre a arquitetura simbólica e os elementos únicos do painel do primeiro grau no Rito Escocês.',
                meta: ['Instrução', '15 min']
            },
            {
                icon: 'History',
                cat: 'História',
                title: 'A Origem do Rito: De Charleston ao Brasil',
                excerpt: 'A trajetória histórica do Rito Escocês Antigo e Aceito desde sua fundação em 1801 até sua consolidação em solo brasileiro.',
                meta: ['História REAA', '20 min']
            },
            {
                icon: 'Scale',
                cat: 'Filosofia',
                title: 'O Legado das Guildas Medievais',
                excerpt: 'Uma análise profunda sobre a transição da Maçonaria Operativa para a Especulativa e a preservação dos ritos ancestrais.',
                meta: ['História', '15 min']
            },
            {
                icon: 'Star',
                cat: 'Simbolismo',
                title: 'O G.A.D.U. e a Diversidade Religiosa',
                excerpt: 'Reflexão sobre o conceito do Grande Arquiteto do Universo como princípio unificador que respeita todas as crenças individuais.',
                meta: ['Filosofia', '10 min']
            },
            {
                cat: 'Palestras',
                title: 'A Liderança Ética e o Perfil do Mestre Maçom',
                excerpt: 'Uma análise profunda sobre o papel das lideranças na Ordem e os desafios da conduta ética na sociedade contemporânea.',
                meta: ['Kennyo Ismail', '50 min'],
                icon: 'Mic'
            },
            {
                cat: 'Seminários',
                title: 'Seminário Nacional de História da Maçonaria no Brasil',
                excerpt: 'Compilado de estudos sobre a participação da Maçonaria na Independência e na Proclamação da República.',
                meta: ['CMSB', 'Anais 2024'],
                icon: 'Users'
            },
            {
                cat: 'Biblioteca',
                title: 'História Geral da Maçonaria (Nicola Aslan)',
                excerpt: 'Obra fundamental de um dos maiores historiadores maçônicos do Brasil, explorando as raízes da Ordem no país.',
                meta: ['Ed. Madras', 'Destaque'],
                icon: 'Book'
            }
        ]
    },
    institute: {
        tag: 'Responsabilidade Social',
        title: 'Instituto Social Conciliação',
        quote: '"Fazer do mundo um lugar melhor do que o encontramos. Esta é a nossa maior obra."',
        paragraph1: 'A Maçonaria não existe para si mesma. Nosso Instituto Social traduz em ação concreta os valores de fraternidade e caridade que fundamentam nossa ordem no Amazonas.',
        paragraph2: 'Projetos educacionais, assistência a famílias vulneráveis, campanhas de saúde e ações de impacto real na vida das comunidades de Manaus e do interior do estado.',
        projects: [
            {
                icon: '🎓',
                title: 'Academia Maçônica de Liderança',
                desc: 'Formação de líderes éticos e capacitados para os desafios da sociedade contemporânea.'
            },
            {
                icon: '🏛️',
                title: 'Núcleo de Estudos Filosóficos',
                desc: 'Espaço dedicado à pesquisa e ao aprofundamento do pensamento maçônico universal.'
            },
            {
                icon: '🗓️',
                title: 'Fórum Anual',
                desc: 'Evento de destaque que reúne especialistas para debater temas de relevância social e moral.'
            },
            {
                icon: '🛶',
                title: 'Projeto Ribeirinho',
                desc: 'Assistência integral e sustentável às comunidades remotas das bacias do Amazonas e Solimões.'
            },
            {
                icon: '🚀',
                title: 'Projeto Jovens Empreendedores',
                desc: 'Mentoria e suporte para o desenvolvimento de novos talentos e negócios éticos na região.'
            },
            {
                icon: '📜',
                title: 'Acervo Conciliação',
                desc: 'Preservação da memória histórica da Maçonaria no Amazonas e de nossa Loja centenária.'
            },
            {
                icon: '🤝',
                title: 'Clube de Negócios',
                desc: 'Rede de colaboração entre irmãos e parceiros focada na prosperidade e auxílio mútuo.'
            }
        ]
    },
    library: {
        tag: 'Biblioteca REAA',
        title: 'Acervo e Literatura do Rito Escocês',
        intro: 'Obras fundamentais para o estudo da liturgia, história e filosofia exclusivas do Rito Escocês Antigo e Aceito.',
        sections: [
            {
                title: '1. Ordem Sobre o Caos (Kennyo Ismail)',
                content: 'A obra definitiva sobre a história e o funcionamento dos 33 graus do REAA, detalhando simbolismo e princípios éticos.'
            },
            {
                title: '2. Moral e Dogma do REAA (Rizzardo da Camino)',
                content: 'Um estudo profundo sobre a base filosófica e os ensinamentos morais que sustentam a jornada escocesa.'
            },
            {
                title: '3. Manual de Instrução GOB (1º ao 3º Grau)',
                content: 'Manuais oficiais que regem a prática ritualística e a liturgia escocesa para as Lojas da Federação.'
            },
            {
                title: '4. O Simbolismo do REAA (Nicola Aslan)',
                content: 'Análise erudita dos símbolos e ritos que compõem a espinha dorsal da Maçonaria Escocesa no Brasil.'
            }
        ],
        footer: 'Acesse o portal do Supremo Conselho para materiais dos Graus Filosóficos.'
    },
    lectures: {
        tag: 'Ciclo de Instrução REAA',
        title: 'Conferências sobre a Liturgia Escocesa',
        intro: 'Palestras focadas no aprimoramento do obreiro dentro dos padrões do Rito Escocês.',
        sections: [
            {
                title: 'As Viagens da Iniciação Escocesa',
                content: 'Explicação simbólica sobre as provações e o significado esotérico das circulações no rito.'
            },
            {
                title: 'O Pavimento Mosaico e a Dualidade',
                content: 'Como a interação entre o preto e o branco no templo REAA reflete a harmonia dos opostos.'
            },
            {
                title: 'A Escada de Jacó e os Graus de Virtude',
                content: 'O simbolismo da ascensão moral representada na decoração e liturgia do rito.'
            }
        ],
        attributes: [
            { label: 'Rito', value: 'R.E.A.A.' },
            { label: 'Foco', value: 'Simbolismo e Liturgia' }
        ],
        footer: 'Vídeos disponíveis na área restrita.'
    },
    seminars: {
        tag: 'Eventos REAA 2025',
        title: 'Encontros e Seminários Escoceses',
        intro: 'Participe das atividades voltadas à manutenção e estudo da pureza do rito.',
        sections: [
            {
                title: 'Convenção Nacional de Liturgia REAA',
                content: 'Seminário anual para uniformização dos procedimentos ritualísticos nas Lojas da Jurisdição.'
            },
            {
                title: 'Simpósio do Supremo Conselho Grau 33',
                content: 'Encontro destinado ao estudo da filosofia dos altos graus e sua conexão com as Lojas Simbólicas.'
            },
            {
                title: 'Vade-Mécum Escocês: Prática e Ritual',
                content: 'Workshop prático sobre a execução correta da liturgia e o uso das ferramentas no altar.'
            }
        ],
        footer: 'Organização: Grande Secretaria de Orientação Ritualística.'
    },
    nominata: {
        tag: 'Corpo de Oficiais',
        title: 'Nominata 2026',
        description: 'Os oficiais que conduzem os trabalhos e a harmonia de nossa Augusta e Respeitável Loja.',
        members: [
            { role: 'Venerável Mestre', name: 'EDUARDO CÉSAR OLIVEIRA SOUZA', photo: '/assets/nominata/eduardo_souza.png' },
            { role: '1º Vigilante', name: 'HAILDO JARBAS RODRIGUES', photo: '/assets/nominata/haildo_rodrigues.png' },
            { role: '2º Vigilante', name: 'SÁVIO JOSÉ FERNANDES DA SILVA', photo: '/assets/nominata/savio_silva.png' },
            { role: 'Orador', name: 'RAFAEL NORMANDO MIRANDA', photo: '/assets/nominata/rafael_miranda.png' },
            { role: 'Orador Adjunto', name: 'ASDRÚBAL FRANCISCO EPAMINONDAS DE MELO', photo: '/assets/nominata/asdrubal_melo.png' },
            { role: 'Secretário', name: 'EDUARDO SIMÕES PASSOS', photo: '/assets/nominata/eduardo_passo.png' },
            { role: 'Secretário Adjunto', name: 'FRANCISCO MOACIR MAIA FILHO', photo: '/assets/nominata/moacir_maia.png' },
            { role: 'Chanceler', name: 'FERNANDO HUBER PICANÇO DE OLIVEIRA', photo: '/assets/nominata/fernando_huber.png' },
            { role: 'Tesoureiro', name: 'SOLON BANDEIRA GUEDES NETO', photo: '/assets/nominata/solon_bandeira.png' },
            { role: 'Tesoureiro Adjunto', name: 'NAUDIR ARAÚJO SOARES', photo: '/assets/nominata/naudir_soares.png' },
            { role: 'Hospitaleiro', name: 'DEUBSON RODRIGUES DE ALBUQUERQUE', photo: '/assets/nominata/deubson_albuquerque.png' },
            { role: 'Mestre de Cerimônias', name: 'HENRIQUE MATHEUS JOSE PEREIRA SANTOS', photo: '/assets/nominata/henrique_santos.png' },
            { role: '1º Diácono', name: 'FABIANO KLEBER LAGO PINTO', photo: '/assets/nominata/fabiano_kleber.png' },
            { role: '2º Diácono', name: 'ALISSON MOACIR DE ARAUJO MAIA', photo: '/assets/nominata/alisson_maia.png' },
            { role: '1º Experto', name: 'JOSÉ ESTEVAM PORTELA', photo: '/assets/nominata/jose_estevam.png' },
            { role: '2º Experto', name: 'ANDRE DOS SANTOS EVANGELISTA', photo: '/assets/nominata/andre_evangelista.png' },
            { role: 'Porta Estandarte', name: 'HELADIO DE SOUZA GOMES', photo: '/assets/nominata/heladio_gomes.png' },
            { role: 'Porta Espada', name: 'LAUDIMIRO OSMIDIO LIMA', photo: '/assets/nominata/laudimiro_lima.png' },
            { role: 'Guarda do Templo', name: 'JERRI ADRIANI PENA DE ABREU', photo: '/assets/nominata/jerri_abreu.png' },
            { role: 'Mestre de Banquetes', name: 'ORCIVALDO DE MORAES CABRAL', photo: '/assets/nominata/orcivaldo_cabral.png' },
            { role: 'Mestre de Harmonia', name: 'MANACIR PORTO DOS SANTOS FILHO', photo: '/assets/nominata/manacir_santos.png' },
            { role: 'Representante Titular ALM', name: 'CLAUDIO ANTÔNIO PAULA DE CASTRO', photo: '/assets/nominata/claudio_castro.png' },
            { role: 'Representante Suplente ALM', name: 'CLÁUDIO DE BARROS MOURA', photo: '/assets/nominata/claudio_moura.png' }
        ]
    },
    clubeAcacias: {
        tag: 'Fraternidade Feminina',
        title: 'Clube das Acácias',
        image: '/assets/clube-acacias/clube_acacias_foto_grupo.jpg',
        intro: 'O Clube das Acácias é o braço feminino de nossa Loja, composto pelas esposas, mães, irmãs e filhas de maçons, dedicando-se incansavelmente ao apoio institucional e às obras de caridade na comunidade amazonense.',
        sections: [
            {
                title: 'Nossa Missão',
                content: 'Atuamos como um suporte vital para a harmonia da família maçônica, promovendo a união entre as famílias dos irmãos e realizando ações sociais que impactam diretamente os que mais precisam em Manaus.\n\nNossa atuação é pautada pela discrição, pela elegância moral e pelo compromisso inabalável com o bem-estar social.'
            },
            {
                title: 'Atividades e Projetos',
                content: 'O Clube organiza eventos beneficentes, bazares solidários e campanhas de arrecadação sazonal. Além disso, as "Cunhadas" (como são carinhosamente chamadas) desempenham papel fundamental na organização de nossas celebrações e na hospitalidade da Loja.'
            }
        ],
        footer: 'Coordenação Regional do Clube das Acácias — G.B.L.S. Conciliação Amazonense Nº 3'
    },
    testimonials: {
        tag: 'Depoimentos',
        title: 'O que dizem nossos Irmãos',
        description: 'Cada membro tem uma história única sobre o que o trouxe à Maçonaria.',
        list: [
            {
                text: 'O que mais ganho com a Maçonaria é autoconfiança nas minhas capacidades como pessoa e profissional. O ambiente de respeito mútuo no Templo transforma quem somos fora dele.',
                author: 'Carlos Medeiros',
                info: 'Membro desde 2018 · Grau de Mestre',
                initial: 'C'
            },
            {
                text: 'Ingressei por curiosidade filosófica, mas o que encontrei superou todas as expectativas. As amizades que construí na Loja Nº 3 são das mais genuínas da minha vida.',
                author: 'Roberto Almeida',
                info: 'Membro desde 2015 · Grau de Mestre',
                initial: 'R'
            },
            {
                text: 'A Maçonaria me deu valores, camaradagem e um senso de pertencimento que buscava há muito tempo. O estudo filosófico na Academia da Loja é particularmente enriquecedor.',
                author: 'Marcos Ferreira',
                info: 'Membro desde 2020 · Grau de Companheiro',
                initial: 'M'
            }
        ],
        pending: []
    },
    nav: {
        announce: {
            date: '15 de Março, 2026 — 20h',
            text: 'Próxima Sessão:',
            linkText: 'Conheça nossa história →',
            link: '#historia'
        },
        logo: {
            name: 'Grande Benemérita Loja Simbólica',
            sub: 'Conciliação Amazonense Nº 3'
        },
        links: [
            {
                label: 'Descobrir', href: '#sobre', dropdown: [
                    {
                        title: 'Descobrir a Maçonaria', items: [
                            { label: 'História da Maçonaria', href: '#historia-maçonaria' },
                            { label: 'Maçonaria no Brasil', href: '#maconaria-brasil' },
                            { label: 'Maçonaria no Amazonas', href: '#maconaria-amazonas' },
                            { label: 'GLOMAM', href: '#glomam' }
                        ]
                    }
                ]
            },
            {
                label: 'Sobre a Loja', href: '#historia', dropdown: [
                    {
                        title: 'A Instituição', items: [
                            { label: 'História', href: '#historia' },
                            { label: 'Nossos Valores', href: '#valores' },
                            { label: 'Nominata', href: '#nominata' },
                            { label: 'Veneráveis Mestres', href: '#veneraveis' },
                            { label: 'Clube das Acácias', href: '#clube-acacias' }
                        ]
                    }
                ]
            },
            {
                label: 'Academia', href: '#academia-portal', dropdown: [
                    {
                        title: 'Áreas de Estudo', items: [
                            { label: 'Artigos Filosóficos', href: '#academia-portal' },
                            { label: 'Palestras', href: '#academia-portal' },
                            { label: 'Seminários', href: '#academia-portal' },
                            { label: 'Biblioteca', href: '#academia-portal' }
                        ]
                    }
                ]
            },
            {
                label: 'Instituto Social', href: '#instituto', dropdown: [
                    {
                        title: 'Iniciativas Sociais', items: [
                            { label: 'Academia de Liderança', href: '#academia-maconica-de-lideranca' },
                            { label: 'Estudos Filosóficos', href: '#nucleo-de-estudos-filosoficos' },
                            { label: 'Fórum Anual', href: '#forum-anual' },
                            { label: 'Projeto Ribeirinho', href: '#projeto-ribeirinho' },
                            { label: 'Jovens Empreendedores', href: '#projeto-jovens-empreendedores' },
                            { label: 'Acervo Histórico', href: '#acervo-conciliacao' },
                            { label: 'Clube de Negócios', href: '#clube-de-negocios' }
                        ]
                    }
                ]
            }
        ],
        actions: {
            outline: 'Área do Irmão',
            outlineHref: '/login',
            gold: ''
        }
    },
    stats: [
        { num: '3ª', label: 'Mais Antiga do Amazonas' },
        { num: '+50', label: 'Irmãos Ativos' },
        { num: '+100', label: 'Famílias Apoiadas' },
        { num: '∞', label: 'Anos de Tradição' }
    ],
    newsletter: {
        title: 'Newsletter Filosófica',
        description: 'Receba mensalmente artigos sobre virtudes, filosofia e liderança.',
        placeholder: 'Seu e-mail',
        button: 'Subscrever'
    },
    footer: {
        brand: {
            name: 'Grande Benemérita Loja Simbólica',
            sub: 'Conciliação Amazonense Nº 3 · Oriente de Manaus',
            description: 'Fundada no Amazonas, dedicada ao aperfeiçoamento moral, filosófico e social de seus membros e da comunidade amazonense.'
        },
        socials: [
            { id: 'ig', title: 'Instagram', href: 'https://www.instagram.com/conciliacaoamazonense/' },
            { id: 'yt', title: 'YouTube', href: '#' }
        ],
        columns: [
            {
                title: 'Portal',
                links: [
                    { label: 'O que é a Maçonaria', href: '#sobre' },
                    { label: 'História da Loja', href: '#historia' },
                    { label: 'Nossos Valores', href: '#valores' },
                    { label: 'Academia Filosófica', href: '#academia-portal' },
                    { label: 'Instituto Social', href: '#instituto' }
                ]
            },
            {
                title: 'Academia',
                links: [
                    { label: 'Artigos Filosóficos', href: '#academia-portal' },
                    { label: 'Palestras', href: '#academia-portal' },
                    { label: 'Seminários', href: '#academia-portal' },
                    { label: 'Biblioteca', href: '#academia-portal' },
                    { label: 'Newsletter', href: '#newsletter' }
                ]
            },
            {
                title: 'Institucional',
                links: [
                    { label: 'Nossa sede', href: '#sobre' },
                    { label: 'Área do Irmão', href: '#' },
                    { label: 'Política de Privacidade', href: '#' },
                    { label: 'Fale Conosco', href: '#' }
                ]
            }
        ],
        bottom: {
            copy: '© 2026 Grande Benemérita Loja Simbólica Conciliação Amazonense Nº 3 · Todos os direitos reservados',
            motto: 'Lux Ex Tenebris — A luz emerge das trevas',
            links: [
                { label: 'Cookies', href: '#' },
                { label: 'Privacidade', href: '#' },
                { label: 'Acessibilidade', href: '#' }
            ]
        }
    }
};

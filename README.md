# MastiControl

**Soluções inteligentes no controle da mastite bovina.**

Site educativo sobre boas práticas na ordenha, criado para ajudar trabalhadores de fazendas leiteiras a executarem o procedimento correto e identificarem sinais de mastite precocemente — com foco em **acessibilidade** e **usabilidade em dispositivos simples**.

> Projeto desenvolvido para apresentação acadêmica de uma estudante de medicina veterinária.

---

## Sobre o projeto

A mastite é uma inflamação do úbere da vaca, causada principalmente por bactérias, e é uma das principais fontes de prejuízo em fazendas leiteiras. Nem sempre é visível a olho nu — por isso o manejo correto durante a ordenha é fundamental.

O MastiControl reúne, em um só lugar:

- Explicação sobre o que é mastite e seus sinais de alerta
- Impactos do manejo inadequado
- Procedimento completo de ordenha higiênica em 8 etapas (com fotos e vídeos)
- Quiz interativo com 12 perguntas para testar o conhecimento
- Ferramenta para acompanhar a evolução mensal de casos no rebanho
- Jogo de organização da ordem correta da ordenha

## Público-alvo

- Trabalhadores de fazendas leiteiras — inclusive quem **não sabe ler**, através dos recursos de áudio
- Estudantes e profissionais da área de zootecnia e medicina veterinária
- Produtores rurais que querem melhorar a qualidade do leite

## Acessibilidade

Todos os conteúdos do site podem ser **ouvidos**, não lidos. Isso foi pensado especificamente para funcionários de fazenda que têm dificuldade com leitura.

- Botões de "🔊 Ouvir" em cada seção, pergunta, etapa e feedback
- Leitura em português brasileiro via Web Speech API
- Popup de acessibilidade explicando os recursos no primeiro acesso
- Botão flutuante para parar a leitura a qualquer momento

## Compatibilidade

Feito para funcionar bem mesmo em celulares antigos e conexões lentas:

- HTML, CSS e JavaScript puros — sem frameworks pesados
- Sem dependências externas de runtime (única exceção: fonte Nunito via Google Fonts)
- Layout responsivo (mobile-first) com menu hambúrguer
- Vídeos com `preload="metadata"` para não pesar no carregamento inicial
- Imagens com `loading="lazy"`
- Persistência local com `localStorage` (não requer backend nem cadastro)

## Funcionalidades

### Quiz de conhecimento
12 perguntas sobre boas práticas de ordenha, com feedback educativo em cada resposta e resumo final destacando o que revisar.

### Procedimento em 8 etapas
Passo a passo ilustrado com fotos e vídeos:
1. Higienização do ambiente
2. Higiene do ordenhador
3. Limpeza dos tetos
4. Teste inicial do leite (caneca de fundo preto)
5. Ordem de ordenha (das vacas saudáveis para as com mastite)
6. Pré-dipping
7. Colocação das teteiras
8. Pós-dipping e cuidados com o esfíncter

Uma barra de progresso fixa acompanha o usuário durante a rolagem.

### Acompanhamento da evolução
Registra semanalmente o número de casos de mastite no rebanho e desenha um gráfico em canvas com a evolução mensal e um resumo automático (total, média e tendência).

### Jogo de ordenação
Arraste ou use os botões ↑ ↓ para colocar as 8 imagens na sequência correta da ordenha. Ideal para treinar e memorizar.

## Como executar localmente

Como é um site estático puro, basta abrir o `index.html` no navegador. Para servir com um servidor local (recomendado, por conta das APIs de áudio):

```bash
# com npx
npx serve .

# ou com Python
python -m http.server 8000
```

Acesse `http://localhost:8000` (ou a porta indicada).

## Estrutura

```
masticontrol/
├── index.html      # estrutura de todas as seções
├── style.css       # design responsivo, animações, componentes
├── script.js       # quiz, TTS, gráfico, jogo de ordenação
├── logo.png        # logo do projeto
├── foto1..3.jpg    # fotos das etapas do procedimento
├── ordem1..8.jpg   # imagens do jogo de ordenação
└── video1..5.mp4   # vídeos das etapas
```

## Tecnologias

- HTML5, CSS3 e JavaScript (vanilla)
- Web Speech API (síntese de voz)
- Canvas API (gráfico de evolução)
- localStorage (persistência de quiz e evolução)
- Drag & Drop API (jogo de ordenação)
- Intersection Observer (animações e destaque da etapa ativa)

## Autor

Feito por **Rodrigo Silva** — [github.com/rodrigo-silvaXD](https://github.com/rodrigo-silvaXD)

## Licença

Livre para uso educacional.

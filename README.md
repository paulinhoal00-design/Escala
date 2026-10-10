# Atualização da instalação — v3

Este pacote contém os arquivos completos. Publique o CONTEÚDO desta pasta na raiz do repositório Escala, ao lado do index.html existente, incluindo a pasta icons. Não envie apenas o ZIP ao GitHub e não crie uma pasta adicional escala dentro do site.

Arquivos: index.html, manifest.json, sw.js, icons/icon-192.png e icons/icon-512.png.

1. Substitua os três arquivos principais e envie a pasta icons inteira.
2. Aguarde a publicação do GitHub Pages.
3. Confirme que estes dois endereços abrem imagens:
   https://paulinhoal00-design.github.io/Escala/icons/icon-192.png
   https://paulinhoal00-design.github.io/Escala/icons/icon-512.png
4. Abra https://paulinhoal00-design.github.io/Escala/ diretamente no Chrome. Se aparecer Nova versão disponível, toque Atualizar; se necessário, recarregue a página.
5. O convite de instalação aparece quando o Chrome libera o evento. Também há a opção Instalação do aplicativo no menu lateral, com orientações quando o convite ainda não está disponível.
6. A confirmação “Solicitação aceita” não significa instalação concluída. O aplicativo só informa instalação confirmada quando recebe o evento appinstalled do navegador.

Se o Chrome disser que o app já está instalado e não conseguir abri-lo, esta alteração não remove registros de instalação do Android. Procure Minha Escala em Configurações > Aplicativos. Não limpe os dados do navegador como primeiro passo; exporte o backup antes de qualquer limpeza.

## Alterações desta versão

- Rotina de instalação e atualização em script independente, executado antes do módulo Firebase.
- PNGs reais de 192 × 192 e 512 × 512, com os caminhos esperados.
- ID explícito igual ao start_url anterior, preservando a identidade esperada do aplicativo.
- Cache v3; a primeira ativação não recarrega a página durante o convite.
- Tratamento de cancelamento, erro e confirmação de instalação.
- Calendário, dados do Firestore e regras de acesso mantidos. Esta correção não exige mudança nas regras do Firebase.

A interface pode ser armazenada pelo Service Worker. O calendário continua dependendo do carregamento do SDK Firebase e da conexão para sincronizar. A instalação final precisa ser verificada no Android após a publicação; não foi testada no aparelho do usuário.

---

# Minha Escala — abertura direta

Aplicativo completo em HTML, CSS e JavaScript. Abre no calendário sem e-mail, senha ou Firebase Authentication. Mantém calendários mensal/anual, modelos personalizados (TF para 12x36, TTTTTTFF para 6x2, TTTTTTF para 6x1), períodos, ocorrências individuais, notas, temas claro/escuro/automático e backup JSON.

## Colocar online

1. Extraia o ZIP e publique o conteúdo de `escala-app` em uma hospedagem HTTPS, preservando os ícones e os três arquivos principais: index.html, manifest.json e sw.js.
2. Abra Firestore Database > Rules no Firebase Console do projeto motores-dexco.
3. Acrescente o bloco `match /app_escalas/compartilhado/{tipo}/{id}` e suas funções, do arquivo firestore.rules, DENTRO do bloco `/databases/{database}/documents` já existente. Preserve todas as outras regras. Não cole o arquivo inteiro por cima das regras atuais. Publique a alteração.
4. Abra o app pela URL HTTPS. O cabeçalho informa conexão, sincronização ou acesso negado.
5. Em Gerenciar escalas, crie o modelo e aplique um período. Para mudar escala, encerre o período anterior na véspera e crie um novo. Para inverter trabalho/folga na 12x36, mude a referência do ciclo em um dia.
6. Para instalar no Android, use o convite de instalação ou a opção Instalar aplicativo no navegador.

## Dados e acesso

Todos os dispositivos leem e gravam o MESMO calendário em `app_escalas/compartilhado`, nas subcoleções escalas, periodos, excecoes, eventos e preferencias. Não há isolamento por pessoa: qualquer cliente que acesse este caminho permitido pelas regras pode ler, editar e excluir esses registros. A configuração Firebase não é uma senha. As regras propostas não liberam outras coleções; regras mais amplas já existentes devem ser revisadas separadamente, pois permissões no Firestore são cumulativas.

Dados antigos sob um UID não são movidos nem excluídos. Se você usou a versão com login, exporte o backup nela e importe nesta versão. A importação mescla IDs existentes e não exclui registros ausentes. Não altere dados simultaneamente durante uma importação. Preferências de tema e cores também são compartilhadas.

A sincronização em tempo real usa onSnapshot e exige internet. O PWA armazena a interface; a versão sem login não promete uso completo offline dos dados ou do SDK Firebase. Folgas extras não deslocam o ciclo. Modificar um modelo altera os períodos ligados a ele: para preservar horários antigos ao trocar turno, crie um novo modelo.

As regras e a hospedagem devem ser configuradas pelo proprietário do Firebase. Nenhuma regra foi publicada automaticamente. Faça backup antes de substituir os arquivos hospedados. Nova versão do PWA tem cache próprio e aviso para atualizar.

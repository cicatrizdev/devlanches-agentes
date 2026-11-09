# Regras para agentes (e humanos) neste repo

Antes de escrever código:

1. Leia os critérios de aceite do ticket em `docs/`.
2. Planeje em 3–5 bullets o que vai mudar.
3. Liste riscos (timezone, estado compartilhado, escopo, etc.).
4. **Pare e espere aprovação** antes de implementar.

Durante a implementação:

- **TDD**: teste falhando → implementação mínima → verde. Um pedaço por vez.
- Prove visualmente (screenshot) antes de abrir o PR.
- Um commit convencional por passo (`feat:`, `test:`, `fix:`, `docs:`, `chore:`).
- **Sem** trailer de co-author de IA.
- Segredos só em variáveis de ambiente — nunca no código nem no git.
- Não saia do escopo do ticket; se o diff ficar grande, corte e abra follow-up.

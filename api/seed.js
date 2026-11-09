// Cardápio da DevLanches 🍔 — a hamburgueria com os melhores nomes do mercado (de trabalho)
export const lanches = [
  // ── Burgers ──────────────────────────────────────────────────────────────
  { id: 1, nome: 'Big Deploy', descricao: 'Sai direto pra produção: burger duplo, cheddar e zero testes', categoria: 'burger', preco: 34.9, emoji: '🍔' },
  { id: 2, nome: 'X-Refactor', descricao: 'O clássico reescrito do zero — agora com bacon e menos acoplamento', categoria: 'burger', preco: 32.5, emoji: '🥓' },
  { id: 3, nome: 'Monolito', descricao: 'Um burger gigante, impossível de dividir em partes menores', categoria: 'burger', preco: 42.0, emoji: '🗿' },
  { id: 4, nome: 'Trio Microsserviços', descricao: 'Três mini burgers independentes que se comunicam por molho', categoria: 'burger', preco: 38.0, emoji: '🍔' },
  { id: 5, nome: 'Burger Legacy', descricao: 'Ninguém sabe a receita completa, mas funciona há 12 anos', categoria: 'burger', preco: 29.9, emoji: '📼' },
  { id: 6, nome: 'Stack Overflow', descricao: 'Tantas camadas que transborda do pão — copiado de outro cardápio', categoria: 'burger', preco: 36.9, emoji: '🥞' },
  { id: 7, nome: 'Hotfix', descricao: 'Feito em 2 minutos, direto na chapa, sem passar por revisão', categoria: 'burger', preco: 24.9, emoji: '🔥' },
  { id: 8, nome: 'Merge Conflict', descricao: 'Metade calabresa, metade frango — ninguém aprovou os dois lados', categoria: 'burger', preco: 33.0, emoji: '⚔️' },
  { id: 9, nome: 'X-Tudo Full Stack', descricao: 'Do front ao back: tudo a que você tem direito, numa mordida só', categoria: 'burger', preco: 44.9, emoji: '🥪' },
  { id: 10, nome: 'Race Condition', descricao: 'Você pede dois, chega um — e nunca o que você esperava', categoria: 'burger', preco: 31.0, emoji: '🏁' },
  { id: 11, nome: 'Burger Async', descricao: 'Chega quando você menos espera. Await recomendado', categoria: 'burger', preco: 30.0, emoji: '⏳' },
  { id: 12, nome: 'Prod na Sexta', descricao: 'Arriscado, ousado, imprudente — mas às vezes dá muito certo', categoria: 'burger', preco: 27.9, emoji: '🎲' },
  { id: 13, nome: 'Null Burger', descricao: 'Vem sem hambúrguer. Erro? Feature? A cozinha não confirma', categoria: 'burger', preco: 19.9, emoji: '🫥' },
  { id: 14, nome: 'Rubber Duck', descricao: 'Burger de frango que só de olhar pra ele você resolve seu problema', categoria: 'burger', preco: 28.5, emoji: '🦆' },

  // ── Acompanhamentos ──────────────────────────────────────────────────────
  { id: 15, nome: 'Batata Recursiva', descricao: 'Cada porção vem com uma porção menor dentro, até o caso base', categoria: 'acompanhamento', preco: 16.9, emoji: '🍟' },
  { id: 16, nome: 'Onion Rings em Camadas', descricao: 'Arquitetura limpa: cada anel só conhece o anel de dentro', categoria: 'acompanhamento', preco: 18.5, emoji: '🧅' },
  { id: 17, nome: 'Nuggets Mockados', descricao: 'Parecem frango, se comportam como frango — ninguém validou em produção', categoria: 'acompanhamento', preco: 15.9, emoji: '🍗' },
  { id: 18, nome: 'Fritas em Cache', descricao: 'Prontas na hora porque já estavam feitas. Invalidação por conta da casa', categoria: 'acompanhamento', preco: 14.9, emoji: '⚡' },
  { id: 19, nome: 'Polenta O(n)', descricao: 'O tempo de comer cresce linearmente com o tamanho da porção', categoria: 'acompanhamento', preco: 13.9, emoji: '📈' },
  { id: 20, nome: 'Salada Opcional', descricao: 'Tipada como opcional, nunca inicializada por ninguém', categoria: 'acompanhamento', preco: 12.0, emoji: '🥗' },

  // ── Bebidas ──────────────────────────────────────────────────────────────
  { id: 21, nome: 'Milkshake de Merge', descricao: 'Tudo batido junto até parar de dar conflito', categoria: 'bebida', preco: 19.9, emoji: '🥤' },
  { id: 22, nome: 'Refri Debug', descricao: 'Zero açúcar, zero bugs. Uma das duas afirmações é falsa', categoria: 'bebida', preco: 8.9, emoji: '🐛' },
  { id: 23, nome: 'Café CI/CD', descricao: 'Integração contínua de cafeína, entrega contínua de energia', categoria: 'bebida', preco: 7.5, emoji: '☕' },
  { id: 24, nome: 'Suco de Runtime', descricao: 'Espremido em tempo de execução, nunca em tempo de compilação', categoria: 'bebida', preco: 11.9, emoji: '🧃' },
  { id: 25, nome: 'Água Idempotente', descricao: 'Peça quantas vezes quiser: o resultado é sempre o mesmo', categoria: 'bebida', preco: 5.0, emoji: '💧' },
  { id: 26, nome: 'Energético Deadline', descricao: 'Pra virar a noite entregando o que foi prometido de manhã', categoria: 'bebida', preco: 13.5, emoji: '⚡' },
  { id: 27, nome: 'Chá de Rollback', descricao: 'Pra acalmar o coração depois daquele deploy', categoria: 'bebida', preco: 6.9, emoji: '🍵' },

  // ── Sobremesas ───────────────────────────────────────────────────────────
  { id: 28, nome: 'Pudim Imutável', descricao: 'Receita da vovó: qualquer mudança retorna um pudim novo', categoria: 'sobremesa', preco: 12.9, emoji: '🍮' },
  { id: 29, nome: 'Sorvete Lazy Loading', descricao: 'Só sai do freezer quando alguém pede. Derrete sob demanda', categoria: 'sobremesa', preco: 14.5, emoji: '🍨' },
  { id: 30, nome: 'Brownie Hardcoded', descricao: 'Denso, fixo, sem parâmetros. Funciona em qualquer ambiente', categoria: 'sobremesa', preco: 13.9, emoji: '🍫' },
  { id: 31, nome: 'Cookie de Sessão', descricao: 'Aceite os cookies para continuar navegando no cardápio', categoria: 'sobremesa', preco: 9.9, emoji: '🍪' },
  { id: 32, nome: 'Petit Gâteau Try/Catch', descricao: 'Sólido por fora, mas por dentro alguma coisa sempre vaza', categoria: 'sobremesa', preco: 18.9, emoji: '🌋' },

  // ── Combos ───────────────────────────────────────────────────────────────
  { id: 33, nome: 'Combo Full Stack', descricao: 'Burger, batata, bebida e sobremesa: do banco de dados à interface', categoria: 'combo', preco: 59.9, emoji: '🎯' },
  { id: 34, nome: 'Combo Pair Programming', descricao: 'Pra dois: um pilota o burger, o outro navega nas fritas', categoria: 'combo', preco: 74.9, emoji: '👥' },
  { id: 35, nome: 'Combo Onboarding', descricao: 'Tudo que a pessoa nova precisa pra se sentir parte do time', categoria: 'combo', preco: 49.9, emoji: '👋' },
  { id: 36, nome: 'Combo Daily', descricao: 'Rápido, em pé, 15 minutos — e sem enrolação', categoria: 'combo', preco: 39.9, emoji: '🕒' },
  { id: 37, nome: 'Combo Legacy', descricao: 'Itens que ninguém pede há anos, mas não podem sair do cardápio', categoria: 'combo', preco: 45.0, emoji: '🏛️' },
  { id: 38, nome: 'Combo Sprint', descricao: 'Entrega garantida em 2 semanas. Escopo sujeito a alteração', categoria: 'combo', preco: 54.9, emoji: '🏃' },
  { id: 39, nome: 'Combo Code Review', descricao: 'Vem completo — e com sugestões não solicitadas de melhoria', categoria: 'combo', preco: 52.5, emoji: '🔍' },
  { id: 40, nome: 'Combo useEffect', descricao: 'Você pediu um item e chegaram quatro, em cascata, fora de ordem', categoria: 'combo', preco: 43.9, emoji: '♾️' },
]

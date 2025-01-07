# Canteen & HR Management System

## Objetivo do Projeto
Este projeto visa fornecer uma solução integrada para o gerenciamento de funcionários, departamentos, tarefas, pratos, ingredientes e reservas em um sistema unificado, focado em simplificar operações internas de uma empresa.

---

## Requisitos do Projeto

### 1. Users (Usuários)
**Informações Armazenadas**:
- **Username**: Deve ser único, composto por letras, números ou "_".
- **Nome**: Não pode conter números ou caracteres especiais.
- **NIF**: Obrigatório e único.
- **Password**: Mínimo de 8 caracteres com pelo menos uma letra maiúscula.
- **Departamento**: Associado a um departamento (opcional para admin).
- **Balance**: Saldo inicial, padrão é `0`.
- **Role**: Pode ser "Admin", "Manager", "Employee", "Inactive".

**Restrições**:
- Apenas admins podem inativar usuários.
- Um `admin` só pode ser criado por outro `admin` usando a palavra-chave **"nibelis"** na senha.
- Managers não podem criar outros managers, somente admins.
- Somente **admin** e **HR Manager** podem criar ou editar usuários.
- Funcionários só podem ver e editar suas próprias informações.

---

### 2. Ingredients (Ingredientes)
**Informações Armazenadas**:
- **Nome**: Deve ser único.
- **Alérgeno**: Obrigatório (sim/não).

**Restrições**:
- Não é possível deletar ingredientes que estão associados a pratos.
- Apenas managers podem criar, editar ou apagar ingredientes.

---

### 3. Plates (Pratos)
**Informações Armazenadas**:
- **Nome**: Deve ser único.
- **Tipo**: Carnes, Peixes, Vegetariano.
- **Preço**: Deve ser um número positivo.
- **Ingredientes**: Associados pelo nome.

**Restrições**:
- Apenas managers podem criar pratos.
- Ingredientes devem ser previamente cadastrados.
- Qualquer pessoa logada pode visualizar pratos.

---

### 4. Tasks (Tarefas)
**Informações Armazenadas**:
- **ID**: Gerado automaticamente.
- **Descrição**: Nome da tarefa.
- **Data Limite**: Deve ser futura.
- **Status**: Concluída (Sim/Não).
- **Atribuído a**: Deve ser um usuário válido.

**Restrições**:
- Apenas admins e managers podem criar tarefas.
- Tarefas não podem ser apagadas, apenas marcadas como concluídas.
- Managers só podem ver tarefas do seu departamento.

---

### 5. Reservations (Reservas)
**Informações Armazenadas**:
- **Data**: Obrigatória e válida.
- **Funcionário NIF**: Obrigatório.
- **Prato**: Associado pelo nome.

**Restrições**:
- Apenas managers e admins podem ver todas as reservas.
- Funcionários só podem ver e gerenciar suas próprias reservas.
- Reservas só podem ser feitas até às 10h do mesmo dia.

---

### 6. Departments (Departamentos)
**Informações Armazenadas**:
- **Nome**: Deve ser único.
- **Desconto**: Percentual entre 0 e 100.
- **Manager**: Um departamento pode ter apenas 1 manager associado.

**Restrições**:
- Apenas admins podem criar ou editar departamentos.
- Departamentos com funcionários não podem ser apagados.
- Nome do departamento não pode conter números.

---

## Páginas Implementadas

1. **User**:
   - Login (`/user/login`)
   - Registro (`/user/register`)
   - Dashboard (`/user/dashboard`)

2. **Employee**:
   - Listagem (`/employee/list`)
   - Adicionar (`/employee/add`)
   - Editar (`/employee/edit/:username`)

3. **Department**:
   - Listagem (`/department/list`)
   - Adicionar (`/department/add`)
   - Editar (`/department/edit/:id`)
   - Detalhe (`/department/:id`)

4. **Task**:
   - Listagem (`/task/list`)
   - Adicionar (`/task/add`)
   - Editar (`/task/edit/:id`)

5. **Ingredient**:
   - Listagem (`/ingredient/list`)
   - Adicionar (`/ingredient/add`)
   - Editar (`/ingredient/edit/:id`)

6. **Plate**:
   - Listagem (`/plate/list`)
   - Adicionar (`/plate/add`)
   - Editar (`/plate/edit/:id`)

7. **Reservation**:
   - Listagem (`/reservation/list`)
   - Adicionar (`/reservation/add`)
   - Editar (`/reservation/edit/:id`)



---

## Regras de Navegação
1. Usuários com `role: "inactive"` não podem fazer login.
2. Acesso às rotas é controlado com base no `meta.allowedRoles` definido no arquivo de rotas (`main.js`).
3. Qualquer rota sem autorização redireciona o usuário para `/user/login`.

---

Essa documentação descreve os principais aspectos e restrições do sistema. Com base nela, novos membros da equipe podem rapidamente entender os objetivos do projeto e contribuir para seu desenvolvimento.
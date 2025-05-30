const form = document.getElementById('cadastroForm');

    form.addEventListener('submit', function (e) {
      e.preventDefault(); // Impede o envio

      // Limpa mensagens anteriores
      document.querySelectorAll('.error').forEach(el => el.textContent = '');
      document.getElementById('mensagemSucesso').textContent = '';

      // Pega os valores
      const nome = form.nome.value.trim();
      const email = form.email.value.trim();
      const cpf = form.cpf.value.trim();
      const nascimento = form.nascimento.value;
      const telefone = form.telefone.value.trim();
      const endereco = form.endereco.value.trim();

      let valido = true;

      // Validação Nome
      if (nome.length < 5) {
        document.getElementById('erroNome').textContent = 'Nome deve ter pelo menos 5 caracteres.';
        valido = false;
      }

      // Validação E-mail
      const regexEmail = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      if (!regexEmail.test(email)) {
        document.getElementById('erroEmail').textContent = 'Informe um e-mail válido.';
        valido = false;
      }

      // Validação CPF
      if (!/^\d{11}$/.test(cpf)) {
        document.getElementById('erroCpf').textContent = 'CPF deve conter exatamente 11 dígitos numéricos.';
        valido = false;
      }

      // Validação Data de Nascimento
      const dataNasc = new Date(nascimento);
      const hoje = new Date();
      const idade = hoje.getFullYear() - dataNasc.getFullYear();
      const passouAniversario = hoje.getMonth() > dataNasc.getMonth() ||
        (hoje.getMonth() === dataNasc.getMonth() && hoje.getDate() >= dataNasc.getDate());

      if (!nascimento || idade < 18 || (idade === 18 && !passouAniversario)) {
        document.getElementById('erroNascimento').textContent = 'Cliente deve ter mais de 18 anos.';
        valido = false;
      }

      // Validação Telefone
      if (telefone && !/^\d{10,11}$/.test(telefone)) {
        document.getElementById('erroTelefone').textContent = 'Telefone deve ter entre 10 e 11 dígitos.';
        valido = false;
      }

      // Validação Endereço
      if (endereco.length === 0) {
        document.getElementById('erroEndereco').textContent = 'Endereço é obrigatório.';
        valido = false;
      }

      // Se tudo estiver certo
      if (valido) {
        document.getElementById('mensagemSucesso').textContent = 'Cadastro realizado com sucesso!';
        alert('Cadastro realizado com sucesso!');
        form.reset();
      }
    });
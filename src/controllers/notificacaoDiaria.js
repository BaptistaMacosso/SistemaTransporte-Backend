const cron = require('node-cron');
const { parseISO, differenceInDays, isSameDay } = require('date-fns');
const nodemailer = require('nodemailer');

// Função para enviar e-mails
const enviarEmailNotificacao = async (destinatario, assunto, mensagem) => {
  try {
    const transporter = nodemailer.createTransport({
      service: 'gmail',
      //host: 'smtp.seuprovedor.com', //é aplicado apenas se o cliente tiver um servidor proprio de email.
      //port: 587,
      //secure: false, // true para 465, false para outras portas
      auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASSWORD,
      },
    });

    const mailOptions = {
      from: `"Sistema de Gestão de Transporte" ${process.env.EMAIL_USER}`,
      to: destinatario,
      subject: assunto,
      html: mensagem,
    };

    const info = await transporter.sendMail(mailOptions);
    console.log('E-mail enviado:', info.messageId);
  } catch (error) {
    console.error('Erro ao enviar e-mail:', error);
  }
};

// Função para verificar licenças
//Devo rever a data de hoje se é necessário enviar o pegar por padrão aqui no método.
//EmailsEnviados posso criar uma função para listar todos os email já enviados
//Também tenho de capturar o email do usuário administrador do sistema ou administradores com permissão para 
//receber notificações por email.
//Obrigatório rever isso ainda hoje sem falta.
export const verificarLicencas = (licencas, hoje, emailsEnviados) => {
  licencas.forEach((licenca) => {
    const dataVencimento = parseISO(licenca.dataVencimento);
    const diasParaVencimento = differenceInDays(dataVencimento, hoje);

    const jaEnviado = emailsEnviados[licenca.id];

    if (diasParaVencimento === 15 && !jaEnviado) {
      // Envia e-mail de alerta para licença próxima do vencimento
      enviarEmailNotificacao(
        'admin@exemplo.com',
        `Alerta: Licença "${licenca.descricao}" próxima do vencimento!`,
        `
          <h1>Notificação de Vencimento</h1>
          <p>A licença <strong>${licenca.descricao}</strong> está próxima de vencer.</p>
          <p><strong>Data de Vencimento:</strong> ${licenca.dataVencimento}</p>
          <p>Por favor, tome as medidas necessárias para renovação.</p>
        `
      );
      emailsEnviados[licenca.id] = true;
    } else if (diasParaVencimento < 0 && isSameDay(hoje, dataVencimento)) {
      // Envia e-mail de alerta para licença expirada
      enviarEmailNotificacao(
        'admin@exemplo.com',
        `Aviso: Licença "${licenca.descricao}" expirada!`,
        `
          <h1>Notificação de Licença Expirada</h1>
          <p>A licença <strong>${licenca.descricao}</strong> está expirada desde ${licenca.dataVencimento}.</p>
          <p>Renove imediatamente para evitar multas ou sanções.</p>
        `
      );
      emailsEnviados[licenca.id] = true;
    }
  });
};








// Exemplo de licenças
const licencas = [
    { id: 1, descricao: 'Licença de Transporte XYZ', dataVencimento: '2025-01-16' },
    { id: 2, descricao: 'Licença de Publicidade ABC', dataVencimento: '2025-01-01' },
  ];
  
  // Objeto para armazenar e-mails já enviados
  const emailsEnviados = {};
  
  // Agendamento diário às 8h
  cron.schedule('0 8 * * *', () => {
    console.log('Executando verificação diária de licenças...');
    verificarLicencas(licencas, new Date(), emailsEnviados);
    console.log('Verificação concluída.');
  });
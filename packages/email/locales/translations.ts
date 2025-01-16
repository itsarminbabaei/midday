export interface TranslationParams {
  [key: string]: string | number | undefined;
}

export function translations(locale: string, params?: TranslationParams) {
  switch (locale) {
    case "en":
      return {
        "notifications.match": `We matched the transaction “${params?.transactionName}” against “${params?.fileName}”`,
        "notifications.transactions":
          params?.numberOfTransactions &&
          typeof params?.numberOfTransactions === "number" &&
          params?.numberOfTransactions > 1
            ? `You have ${params?.numberOfTransactions} new transactions`
            : `You have a new transaction of ${params?.amount} from ${params?.name}`,
        "notifications.invoicePaid": `Invoice ${params?.invoiceNumber} has been paid`,
        "notifications.invoiceOverdue": `Invoice ${params?.invoiceNumber} is overdue`,
        "transactions.subject": "New transactions",
        "transactions.preview": `Hi ${params?.firstName}, You have ${
          params?.numberOfTransactions
        } ${
          params?.numberOfTransactions > 1
            ? "new transactions"
            : "new transaction"
        }`,
        "transactions.title1": "You have ",
        "transactions.title2": `${params?.numberOfTransactions} ${
          params?.numberOfTransactions > 1
            ? "new transactions"
            : "new transaction"
        }`,
        "transactions.description1": `Hi ${params?.firstName}`,
        "transactions.description2": "We found",
        "transactions.description3": `${params?.numberOfTransactions} ${
          params?.numberOfTransactions > 1
            ? "new transactions"
            : "new transaction"
        }`,
        "transactions.description4": `for your team ${params?.teamName}, we will try to match those against receipts in your inbox for up to 45 days. Additionally, you can simply reply to this email with the receipts.`,
        "transactions.button": "View transactions",
        "transactions.settings": "Notification preferences",
        "transactions.amount": "Amount",
        "transactions.date": "Date",
        "transactions.description": "Description",
        "invite.subject": `${params?.invitedByName} invited you to the ${params?.teamName} team on Travelese`,
        "invite.preview": `Join ${params?.teamName} on Travelese`,
        "invite.title1": "Join",
        "invite.title2": "on",
        "invite.link1": "has invited you to the",
        "invite.link2": "team on",
        "invite.join": "Join the team",
        "invite.link3": "or copy and paste this URL into your browser",
        "invite.footer1": "This invitation was intended for",
        "invite.footer2": "This invite was sent from",
        "invite.footer3": "located in",
        "invite.footer4":
          "If you were not expecting this invitation, you can ignore this email. If you are concerned about your account's safety, please reply to this email to get in touch with us.",
        "invoice.overdue.subject": `Invoice #${params?.invoiceNumber} is overdue`,
        "invoice.paid.subject": `Invoice #${params?.invoiceNumber} has been paid`,
      };
    case "fr":
      return {
        "notifications.match": `Nous avons rapproché la transaction "${params?.transactionName}" avec "${params?.fileName}"`,
        "notifications.transactions":
          params?.numberOfTransactions &&
          typeof params?.numberOfTransactions === "number" &&
          params?.numberOfTransactions > 1
            ? `Vous avez ${params?.numberOfTransactions} nouvelles transactions`
            : `Vous avez une nouvelle transaction de ${params?.amount} de ${params?.name}`,
        "notifications.invoicePaid": `La facture ${params?.invoiceNumber} a été payée`,
        "notifications.invoiceOverdue": `La facture ${params?.invoiceNumber} est en retard`,
        "transactions.subject": "Nouvelles transactions",
        "transactions.preview": `Bonjour ${params?.firstName}, Nous avons trouvé ${
          params?.numberOfTransactions
        } ${
          params?.numberOfTransactions > 1
            ? "nouvelles transactions"
            : "nouvelle transaction"
        } .`,
        "transactions.title1": "Vous avez ",
        "transactions.title2": `${params?.numberOfTransactions} ${
          params?.numberOfTransactions > 1
            ? "nouvelles transactions"
            : "nouvelle transaction"
        }`,
        "transactions.description1": `Bonjour ${params?.firstName}`,
        "transactions.description2": "Nous avons trouvé",
        "transactions.description3": `${params?.numberOfTransactions} ${
          params?.numberOfTransactions > 1
            ? "nouvelles transactions"
            : "nouvelle transaction"
        }`,
        "transactions.description4":
          "sur votre compte que nous essayons de rapprocher avec les reçus dans votre boîte de réception pendant jusqu'à 45 jours. Vous pouvez également répondre à cet e-mail avec vos reçus.",
        "transactions.button": "Voir les transactions",
        "transactions.footer":
          " Nam imperdiet congue volutpat. Nulla quis facilisis lacus. Vivamus convallis sit amet lectus eget tincidunt. Vestibulum vehicula rutrum nisl, sed faucibus neque. Donec lacus mi, rhoncus at dictum eget, pulvinar at metus. Donec cursus tellus erat, a hendrerit elit rutrum ut. Fusce quis tristique ligula. Etiam sit amet enim vitae mauris auctor blandit id et nibh.",
        "transactions.settings": "Paramètres",
        "transactions.amount": "Montant",
        "transactions.date": "Date",
        "transactions.description": "Description",
        "invite.subject": `${params?.invitedByName} vous a invité à rejoindre ${params?.teamName} sur Travelese`,
        "invite.preview": `Rejoindre ${params?.teamName} sur Travelese`,
        "invite.title1": "Rejoindre",
        "invite.title2": "sur",
        "invite.link1": "vous a invité à",
        "invite.link2": "sur",
        "invite.join": "Rejoindre",
        "invite.link3":
          "ou copiez et collez cette URL dans votre navigateur",
        "invite.footer1": "Cette invitation était destinée à",
        "invite.footer2": "Cette invitation a été envoyée depuis",
        "invite.footer3": "situé à",
        "invite.footer4":
          "Si vous n'attendiez pas cette invitation, vous pouvez l'ignorer. Si vous êtes préoccupé par la sécurité de votre compte, veuillez répondre à cet e-mail pour nous contacter.",
        "invoice.overdue.subject": `Facture #${params?.invoiceNumber} est en retard`,
        "invoice.paid.subject": `Facture #${params?.invoiceNumber} a été payée`,
      };

    default:
      return;
  }
}

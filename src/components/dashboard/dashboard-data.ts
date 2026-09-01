export type TransactionStatus = 'Terminée' | 'En attente' | 'Échouée'

export const demoTransactions = [
  { id: 'NP-240812', name: 'Paul Mavoungou', initials: 'PM', amount: '-10 000 XAF', date: "Aujourd'hui, 10:42", status: 'Terminée' as TransactionStatus, tone: 'bg-primary/15 text-primary' },
  { id: 'NP-240811', name: 'Marie Diop', initials: 'MD', amount: '-25 000 XAF', date: 'Hier, 16:20', status: 'En attente' as TransactionStatus, tone: 'bg-warning/15 text-warning' },
  { id: 'NP-240809', name: 'Junior Okana', initials: 'JO', amount: '-7 500 XAF', date: '12 août 2026, 09:15', status: 'Terminée' as TransactionStatus, tone: 'bg-secondary/15 text-secondary' },
  { id: 'NP-240806', name: 'Amina Fall', initials: 'AF', amount: '-42 000 XAF', date: '10 août 2026, 18:05', status: 'Échouée' as TransactionStatus, tone: 'bg-error/15 text-error' },
]

export const demoContacts = [
  { name: 'Paul Mavoungou', phone: '+242 06 555 12 45', initials: 'PM', color: 'bg-primary text-primary-content', favorite: true },
  { name: 'Marie Diop', phone: '+221 77 234 56 78', initials: 'MD', color: 'bg-secondary text-secondary-content', favorite: true },
  { name: 'Junior Okana', phone: '+242 05 987 65 43', initials: 'JO', color: 'bg-accent text-accent-content', favorite: false },
  { name: 'Amina Fall', phone: '+221 76 456 78 90', initials: 'AF', color: 'bg-warning text-warning-content', favorite: false },
]

export const demoPaymentMethods = [
  { name: 'MTN Mobile Money', detail: '+242 06 123 45 67', badge: 'MTN', color: 'bg-[#ffcc00] text-black', preferred: true },
  { name: 'Airtel Money', detail: '+242 05 123 45 67', badge: 'airtel', color: 'bg-[#ed1c24] text-white', preferred: false },
  { name: 'Visa', detail: '•••• 4242', badge: 'VISA', color: 'bg-[#172b85] text-white', preferred: false },
]

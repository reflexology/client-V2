const Dictionary = {
  login: {
    username: 'שם משתמש',
    password: 'סיסמא',
    submitButton: 'התחבר',
    usernameRequiredMessage: 'חובה למלא שם משתמש',
    passwordRequiredMessage: 'חובה למלא סיסמא',
    header: 'כניסה לחשבון שלך'
  },
  sidebar: {
    incomeAndExpense: 'הכנסות הוצאות',
    reminders: 'תזכורות',
    patients: 'לקוחות',
    logout: 'התנתק'
  },
  addPatient: {
    header: 'הוסף לקוח'
  },
  editPatient: {
    header: 'ערוך לקוח'
  },
  patientForm: {
    firstName: 'שם פרטי',
    lastName: 'שם משפחה',
    momName: 'שם האמא',
    birthday: 'תאריך לידה',
    age: 'גיל',
    phone: 'טלפון',
    email: 'אימיל',
    gender: 'מין',
    childrenCount: 'מספר ילדים',
    lastTreatment: 'טיפול אחרון',
    maritalStatus: 'סטטוס',
    wrongEmail: 'כתובת האימיל שגוייה',
    minChildrenCount: 'ערך שגוי',
    firstNameRequired: 'חובה למלא שם פרטי',
    lastNameRequired: 'חובה למלא שם משפחה',
    save: 'שמור'
  },
  addTransaction: {
    header: 'הוסף הכנסה/הוצאה'
  },
  transaction: {
    addTransactionButton: 'הוסף הכנסה/הוצאה'
  },
  transactionForm: {
    description: 'תיאור',
    note: 'הערה',
    amount: 'סכום',
    createdAt: 'תאריך',
    descriptionRequired: 'חובה למלא תיאור',
    amountRequired: 'חובה למלא סכום',
    minAmountCount: 'ערך שגוי',
    transactionType: 'פעולה',
    income: 'הכנסה',
    expenditure: 'הוצאה'
  },
  addTreatment: {
    header: 'הוסף טיפול'
  },
  treatmentForm: {
    treatmentDate: 'תאריך טיפול',
    referredBy: 'הופנה ע"י',
    visitReason: 'סיבת ביקור',
    treatmentNumber: 'מספר טיפול',
    diagnoses: 'אבחנות',
    findings: 'ממצאים',
    recommendations: 'המלצות',
    treatmentPrice: 'מחיר הטיפול',
    paidPrice: 'סכום ששולם',
    remarks: 'הערות',
    reminders: 'תזכורות',
    reminderDate: 'תאריך תזכורת',
    inAWeek: 'עוד שבוע',
    errorFetchingDiagnoses: 'היתה בעיה לטעון את האבחונים מהשרת..'
  },
  serverErrors: {
    err_username_required: 'שם משתמש חסר',
    err_user_does_not_exist: 'משתמש לא קיים',
    err_invalid_password: 'סיסמא שגוייה'
  },
  errorBoundary: {
    title: 'משהו נכשל',
    subTitle: 'נסה לרענן את הדף',
    refreshThePage: 'רענן את הדף'
  },
  notFound: {
    title: '404',
    subTitle: 'כנראה הגעת לעמוד הזה בטעות',
    backButton: 'חזרה לדף הבית'
  },
  generalError: 'בעיה בלתי צפויה התרחשה בשרת',
  generalErrorAndRefresh: 'בעיה בלתי צפויה התרחשה בשרת, נסה לרענן את הדף',
  male: 'זכר',
  female: 'נקבה',
  search: 'חפש..',
  back: 'חזור',

  MaritalStatusForMale: { Married: 'נשוי', Single: 'רווק', Divorced: 'גרוש', Widowed: 'אלמן' },
  MaritalStatusForFemale: { Married: 'נשואה', Single: 'רווקה', Divorced: 'גרושה', Widowed: 'אלמנה' }
};

export default Dictionary;

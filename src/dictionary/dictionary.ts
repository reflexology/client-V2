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
  patientContainer: {
    showInDebt: 'לקוחות בחוב',
    showInCredit: 'לקוחות בזכות',
    showAllPatients: 'כל הלקוחות',
    fromLastTreatment: 'מטיפול אחרון',
    toLastTreatment: 'עד טיפול אחרון',
    balance: 'יתרת החוב',
    resetFilters: 'איפוס'
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
    notes: 'הערות',
    diagnoses: 'אבחנות',
    lastTreatment: 'טיפול אחרון',
    wrongEmail: 'כתובת האימיל שגוייה',
    firstNameRequired: 'חובה למלא שם פרטי',
    lastNameRequired: 'חובה למלא שם משפחה',
    birthdayInvalid: 'ערך שגוי',
    save: 'שמור',
    saveAndAddTreatment: 'שמור והוסף טיפול'
  },
  addTransaction: {
    header: 'הוסף הכנסה/הוצאה'
  },
  editTransaction: {
    header: 'ערוך הכנסה/הוצאה'
  },
  report: {
    header: 'סכומים',
    title: 'פרטים',
    startDate: 'תאריך התחלה',
    endDate: 'תאריך סיום',
    income: 'הכנסה',
    expenditure: 'הוצאה',
    netAmount: 'נטו',
    showReport: 'הצג דוח',
    thisMonth: 'החודש הזה'
  },
  transaction: {
    addTransactionButton: 'הוסף הכנסה/הוצאה',
    showAllTransactions: 'הצג הכל',
    showAllIncome: 'הכנסות',
    showAllExpenditure: 'הוצאות'
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
  treatments: { addTreatment: 'הוסף טיפול' },
  addTreatment: {
    header: 'הוסף טיפול'
  },
  treatmentForm: {
    save: 'שמור',
    saveAndExit: 'סיים ושמור',
    addingTreatment: 'שומר טיפול',
    next: 'הבא',
    previous: 'הקודם',
    treatmentType: 'סוג טיפול',
    treatmentDate: 'תאריך טיפול',
    referredBy: 'הופנה ע"י',
    visitReason: 'סיבת ביקור',
    treatmentNumber: 'מספר טיפול',
    diagnoses: 'אבחנות',
    findings: 'ממצאים',
    recommendations: 'המלצות',
    treatmentPrice: 'מחיר הטיפול',
    profession: 'מקצוע',
    treatmentPriceExtra: '{0} {1} שקל',
    debt: 'חוב',
    credit: 'זכות',
    paidPrice: 'סכום ששולם',
    remarks: 'הערות',
    reminders: 'תזכורות',
    reminderDate: 'תאריך תזכורת',
    inAWeek: 'עוד שבוע',
    treatmentNumberChangedWarning: 'מספר טיפול קודם היה {0} ',
    errorFetchingDiagnoses: 'היתה בעיה לטעון את האבחונים מהשרת..'
  },
  treatmentTypes: {
    diet: 'ייעוץ',
    reflexology: 'רפלקסולוגיה'
  },
  reminders: {
    name: 'שם',
    reminder: 'תזכורת',
    date: 'תאריך',
    showNew: 'תזכורות חדשות',
    showAll: 'כל התזכורות',
    markAllAsRead: 'סמן הכל כהושלם'
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
  cantSaveDiagnosesError: 'היתה בעיה לשמור את האבחונים החדשים',
  male: 'זכר',
  female: 'נקבה',
  search: 'חפש..',
  back: 'חזור',
  edit: 'ערוך'
};

export default Dictionary;

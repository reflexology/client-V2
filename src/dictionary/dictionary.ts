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
  serverErrors: {
    err_username_required: 'שם משתמש חסר',
    err_user_does_not_exist: 'משתמש לא קיים',
    err_invalid_password: 'סיסמא שגוייה'
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

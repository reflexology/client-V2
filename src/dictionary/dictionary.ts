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
    logout: 'התנתק/י'
  },
  patient: {
    firstName: 'שם פרטי',
    lastName: 'שם משפחה',
    monName: 'שם האמא',
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
    lastNameRequired: 'חובה למלא שם משפחה'
  },
  serverErrors: {
    err_username_required: 'שם משתמש חסר',
    err_user_does_not_exist: 'משתמש לא קיים',
    err_invalid_password: 'סיסמא שגוייה'
  },
  generalError: 'בעיה בלתי צפויה התרחשה בשרת',
  male: 'זכר',
  female: 'נקבה',

  MaritalStatusForMale: { Married: 'נשוי', Single: 'רווק', Divorced: 'גרוש', Widowed: 'אלמן' },
  MaritalStatusForFemale: { Married: 'נשואה', Single: 'רווקה', Divorced: 'גרושה', Widowed: 'אלמנה' }
};

export default Dictionary;

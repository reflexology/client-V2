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
  treatments: { addTreatment: 'הוסף טיפול' },
  addTreatment: {
    header: 'הוסף טיפול'
  },
  treatmentForm: {
    save: 'שמור',
    saveAndExit: 'סיים ושמור',
    uploadingFiles: 'מעלה קבצים',
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
    errorFetchingDiagnoses: 'היתה בעיה לטעון את האבחונים מהשרת..',

    // diet
    mainComplaint: 'תלונה עיקרית',
    mainComplaintPlaceholder: 'כולל אבחנה מערבית',
    mainComplaintExtra:
      'מתי התחיל? באיזה גיל? מה קרה בחיים ובתקופה לפני שהתחילה הבעיה? מה מחמיר? מה מקל? \nאיך משפיע על החיים? איך מתמודד עם הבעיה?',
    medicalPast: 'עבר רפואי',
    medicalPastExtra: 'אנטיביוטיקה בעבר והיום, ניתוחים, אישפוזים, מחלות משמעותיות, חומרי הרדמה, תאונות - מתי?',
    drugsAndSupplements: 'תרופות ותוספי מזון',
    drugsAndSupplementsExtra: '(בהווה ובעבר), כמה תרופות? איזה תרופות? וכמה זמן נוטל?',
    height: 'גובה',
    weight: 'משקל',
    additionalTreatments: 'טיפולים נוספים',
    additionalTreatmentsExtra: 'רפואיים ומשלימים איזה טיפול, כמה זמן? ומתי?',
    familyMedicalHistory: 'היסטוריה רפואית משפחתית',
    sleep: 'שינה: איכות השינה, אורך השינה',
    sleepExtra:
      'האם נרדם בקלות? האם ישן שינה טובה? עמוקה? האם מתעורר במהלך הלילה מסיבה כלשהי - אם כן פרט מהי?\nהאם מתעורר עקב דאגות / מתח - כל רעש קטן מעיר, צורך לשירותים...',
    howWakeUp: 'איך קם בבוקר',
    howWakeUpExtra: 'בקלות וחיוניות/בכבדות',
    appetite: 'תיאבון',
    thirst: 'צמא, שתיית מים, כמה?',
    stimulants: 'צריכה של חומרי גרוי וכמויות ביום',
    stimulantsExtra: `קפה / תה, חם / קר, סוכר, כמה כפיות?
משקאות קלים / ממריצים: קולה, רד בול
מלח, תבלינים, חריף, ממתקים, חטיפים, אלכוהול, סמים, חומרי ניקוי, זמן מסך, אוויר מזוהם,
עישון: כמה? מה? וכמה זמן,
תכשירי קוסמטיקה (רחצה, משחות, צבע)`,
    defecation: 'יציאות',
    urine: 'שתן',
    urineExtra: 'כמות, צבע, ריח, תדירות',
    sweat: 'הזעה',
    women: 'נשים',
    exercise: 'פעילות גופנית',

    //diet
    diet: 'תזונה',
    snacks: 'נישנושים',
    crisisHour: 'מתי שעת משבר',
    notLikeToEat: 'האם יש משהו שלא אוכל',
    blenderExists: 'האם יש בלנדר?',
    juicerExists: 'האם יש מסחטת מיצים?',
    dietRecommendations: 'המלצות',
    menu: 'תפריט',
    // stimulants
    coffee: '',
    softDrinks: '',
    salt: 'מלח',
    spices: 'תבלינים',
    spicy: 'חריף',
    sweets: 'ממתקים',
    alcohol: 'אלכוהול',
    drugs: 'סמים',
    cleaners: 'חומרי ניקוי',
    screenTime: 'זמן מסך',
    pollutedAir: 'אוויר מזוהם',
    smoking: 'עישון: כמה? מה? וכמה זמן?',
    cosmetics: 'תכשירי קוסמטיקה (רחצה, משחות, צבע...)',

    bloodTestHeader: 'בדיקות דם',
    addBloodTest: 'הוסף בדיקת דם',
    isImportant: 'חריג'
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

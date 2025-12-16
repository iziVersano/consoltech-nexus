import Navigation from '@/components/Navigation';
import { Helmet } from 'react-helmet-async';
import { Link } from 'react-router-dom';
import { ArrowRight } from 'lucide-react';
import { Button } from '@/components/ui/button';

// Manual step data
const steps = [
  {
    id: 'step-1',
    title: 'שלב 1: הפעלת ה-Nintendo Switch 2',
    images: [{ src: '/manual-images/nintendo-switch-2-power-button.jpg', alt: 'כפתור ההפעלה של Nintendo Switch 2', caption: 'אתרו ולחצו על כפתור ההפעלה' }],
    text: ['כדי להתחיל בהגדרת ה-Nintendo Switch 2 שלכם, אתרו את כפתור ההפעלה על הקונסולה. לחצו והחזיקו את הכפתור עד שהמערכת תיכנס לפעולה.', 'תדעו שההפעלה הושלמה כאשר מסך הבית יופיע על הצג.']
  },
  {
    id: 'step-2',
    title: 'שלב 2: חיבור בקרי ה-Joy-Con',
    images: [
      { src: '/manual-images/detaching-joy-con-controller.jpg', alt: 'חיבור בקר Joy-Con', caption: 'החליקו את בקר ה-Joy-Con למקומו' },
      { src: '/manual-images/instructions-for-detaching-joy-cons.jpg', alt: 'ניתוק בקרי Joy-Con', caption: 'לניתוק: לחצו על לחצן השחרור והחליקו החוצה' }
    ],
    text: ['קחו אחד מבקרי ה-Joy-Con שסופקו עם הקונסולה. יישרו אותו עם צד ה-Nintendo Switch 2 והחליקו אותו למקומו.', 'תשמעו קליק כאשר הבקר מחובר כראוי.', 'לניתוק, פשוט לחצו על לחצן השחרור הקטן בגב והחליקו החוצה.']
  },
  {
    id: 'step-3',
    title: 'שלב 3: בחירת שפה ואזור',
    images: [],
    text: ['כעת, הגיע הזמן לבחור את השפה המועדפת עליכם. תוכלו לעשות זאת על ידי נגיעה במסך או שימוש בבקר על ידי לחיצה על כפתור A.', 'לאחר מכן, בחרו את האזור הנכון. לדוגמה, אם אתם בישראל, בחרו את האזור המתאים מהאפשרויות המוצגות.']
  },
  {
    id: 'step-4',
    title: 'שלב 4: עיון ואישור הסכם המשתמש',
    images: [],
    text: ['לפני שתמשיכו, תתבקשו לעיין בהסכם רישיון למשתמש קצה.', "לאחר שקראתם והסכמתם לתנאים, לחצו על 'המשך' כדי להתקדם."]
  },
  {
    id: 'step-5',
    title: 'שלב 5: התחברות לאינטרנט',
    images: [{ src: '/manual-images/wi-fi-connection-screen.jpg', alt: 'מסך חיבור Wi-Fi', caption: 'בחרו את רשת ה-Wi-Fi שלכם' }],
    text: ['כעת, חברו את ה-Nintendo Switch 2 לאינטרנט. בחרו את רשת ה-Wi-Fi שלכם מהרשימה והזינו את הסיסמה.', 'שלב זה מבטיח שיהיו לכם העדכונים האחרונים של המערכת מוכנים להתקנה.']
  },
  {
    id: 'step-6',
    title: 'שלב 6: עדכון מערכת',
    images: [],
    text: ['לאחר ההתחברות לאינטרנט, המערכת תבקש מכם להוריד ולהתקין עדכונים זמינים.', 'תהליך זה ישפר את ביצועי המערכת ואת האבטחה שלה. לחצו על הבא כדי להתחיל את העדכון.']
  },
  {
    id: 'step-7',
    title: 'שלב 7: הגדרת אזור זמן',
    images: [{ src: '/manual-images/time-zone-selection-screen.jpg', alt: 'מסך בחירת אזור זמן', caption: 'בחרו את אזור הזמן שלכם' }],
    text: ['בחרו את אזור הזמן המתאים בהתאם למיקומכם.', 'לדוגמה, אם אתם בישראל, בחרו באזור הזמן של ישראל (GMT+2) כדי להבטיח שעון מדויק בקונסולה שלכם.']
  },
  {
    id: 'step-8',
    title: 'שלב 8: סגנונות משחק והגדרות',
    images: [{ src: '/manual-images/nintendo-switch-2-kickstand.jpg', alt: 'מעמד Nintendo Switch 2', caption: 'השתמשו במעמד המובנה למצב שולחני' }],
    text: ['ה-Nintendo Switch 2 שלכם מציע מגוון סגנונות משחק. למצב שולחני, השתמשו במעמד המובנה בגב המכשיר.', 'תוכלו גם להכניס כרטיס Micro SD לאחסון נוסף על ידי הרמת המעמד. זכרו להשתמש בכרטיסי Micro SD Express לתאימות מלאה.']
  },
  {
    id: 'step-9',
    title: 'שלב 9: ניתוק בקרי ה-Joy-Con',
    images: [{ src: '/manual-images/instructions-for-detaching-joy-cons.jpg', alt: 'ניתוק בקרי Joy-Con', caption: 'לחצו על לחצן השחרור והחליקו החוצה' }],
    text: ['המערכת עשויה לבקש מכם לנתק את בקרי ה-Joy-Con לצורך ההגדרה.', 'פשוט לחצו על לחצן השחרור בכל בקר והחליקו אותם החוצה בזהירות. תוכלו להתחיל עם הצד הימני או השמאלי.']
  },
  {
    id: 'step-10',
    title: 'שלב 10: חיבור לטלוויזיה (אופציונלי)',
    images: [],
    text: ['אם תרצו לשחק משחקים על מסך גדול יותר, ה-Nintendo Switch 2 יכול להתחבר לטלוויזיה באמצעות תחנת העגינה שלו.', 'תוכלו לבחור להגדיר זאת מאוחר יותר אם תעדיפו.']
  },
  {
    id: 'step-11',
    title: 'שלב 11: בחירת סגנון ההגדרה',
    images: [{ src: '/manual-images/joy-con-controller-setup-options.jpg', alt: 'אפשרויות הגדרת בקר Joy-Con', caption: 'בחרו כיצד להשתמש בבקרי ה-Joy-Con שלכם' }],
    text: ['בשלב זה, יש לכם אפשרות לבחור כיצד תרצו להשתמש בבקרי ה-Joy-Con.', 'חברו אותם בדרכים שונות באמצעות האביזרים שסופקו. תוכלו לשנות הגדרה זו בכל עת.']
  },
  {
    id: 'step-12',
    title: 'שלב 12: השלמת עדכון המערכת',
    images: [],
    text: ['לאחר השלמת עדכון המערכת, החליטו האם להתחיל העברת נתונים. אפשרות זו מיועדת למשתמשים שמעבירים נתונים מקונסולת Switch אחרת.', "אם אתם מעדיפים לא להעביר נתונים, בחרו 'אל תעביר' כדי להתחיל מחדש."]
  },
  {
    id: 'step-13',
    title: 'שלב 13: הוספת חשבון משתמש',
    images: [{ src: '/manual-images/add-user-account-screen.png', alt: 'מסך הוספת חשבון משתמש', caption: 'הוסיפו או התחברו לחשבון Nintendo שלכם' }],
    text: ['הגיע הזמן להוסיף משתמש ל-Nintendo Switch 2 שלכם. תוכלו להתחבר עם חשבון Nintendo קיים או ליצור חשבון חדש.', 'אם תבחרו באפשרות הראשונה, תקבלו קוד QR לסריקה עם הטלפון שלכם לצורך אימות.']
  },
  {
    id: 'step-14',
    title: 'שלב 14: הגדרת בקרת הורים (אופציונלי)',
    images: [{ src: '/manual-images/parental-controls-setup.jpg', alt: 'הגדרת בקרת הורים', caption: 'הגדירו בקרת הורים במידת הצורך' }],
    text: ['למשתמשים עם ילדים, מומלץ להפעיל בקרת הורים. הגדירו הגדרות אלו בהתאם להעדפותיכם.', 'תוכלו גם לדלג על שלב זה ולהגדיר זאת מאוחר יותר במידת הצורך.']
  },
  {
    id: 'step-15',
    title: 'שלב 15: סיום ההתקנה',
    images: [{ src: '/manual-images/nintendo-switch-2-home-button.jpg', alt: 'כפתור הבית של Nintendo Switch 2', caption: 'לחצו על כפתור הבית לגישה לתפריט' }],
    text: ['סיימתם את הגדרת ה-Nintendo Switch 2 שלכם!', 'לחצו על כפתור הבית הנמצא בצד ימין של הקונסולה לגישה לתפריט הראשי. משם תוכלו להוריד משחקים ותוכן נוסף או לחקור את התכונות של המערכת החדשה שלכם.']
  }
];

// Table of contents data
const tocItems = steps.map((step, index) => ({
  id: step.id,
  title: step.title,
  number: index + 1
}));

const NintendoSwitch2Manual = () => {
  const canonicalUrl = typeof window !== 'undefined'
    ? `${window.location.origin}/nintendo-switch-2`
    : '/nintendo-switch-2';

  return (
    <div className="min-h-screen bg-background">
      <Helmet>
        <title>מדריך התקנה Nintendo Switch 2 | Consoltech</title>
        <meta name="description" content="מדריך התקנה מלא ל-Nintendo Switch 2 בעברית. הוראות שלב אחר שלב להפעלה ראשונית, חיבור בקרים, הגדרת רשת ועוד." />
        <link rel="canonical" href={canonicalUrl} />
        <html lang="he" />
      </Helmet>

      {/* Navigation stays LTR */}
      <Navigation />

      {/* Main content is RTL Hebrew */}
      <main dir="rtl" className="container px-4 md:px-6 pt-24 pb-16">
        {/* Header */}
        <header className="max-w-4xl mx-auto text-center mb-10">
          <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold mb-4">
            <span className="gradient-text">Nintendo Switch 2</span>
          </h1>
          <p className="text-xl text-muted-foreground">מדריך התקנה (שלב אחר שלב)</p>
        </header>

        {/* Table of Contents */}
        <nav className="max-w-3xl mx-auto mb-12 p-6 rounded-2xl bg-card/50 backdrop-blur-sm border border-border">
          <h2 className="text-xl font-bold mb-4 text-primary">תוכן עניינים</h2>
          <ol className="space-y-2 pr-4">
            {tocItems.map((item) => (
              <li key={item.id}>
                <a 
                  href={`#${item.id}`} 
                  className="text-muted-foreground hover:text-primary transition-colors"
                >
                  {item.title}
                </a>
              </li>
            ))}
          </ol>
        </nav>

        {/* Steps */}
        <div className="max-w-3xl mx-auto space-y-12">
          {steps.map((step) => (
            <section 
              key={step.id} 
              id={step.id} 
              className="scroll-mt-24 p-6 rounded-2xl bg-card/30 border border-border/50"
            >
              <h2 className="text-xl md:text-2xl font-bold mb-6 text-foreground pr-4 border-r-4 border-primary">
                {step.title}
              </h2>
              
              <div className="space-y-6">
                {step.images.map((img, idx) => (
                  <figure key={idx} className="text-center">
                    <img 
                      src={img.src} 
                      alt={img.alt}
                      className="mx-auto rounded-xl shadow-lg max-w-full h-auto border border-border"
                      loading="lazy"
                    />
                    <figcaption className="mt-3 text-sm text-muted-foreground italic">
                      {img.caption}
                    </figcaption>
                  </figure>
                ))}
                
                <div className="p-4 rounded-xl bg-muted/30 space-y-3">
                  {step.text.map((paragraph, idx) => (
                    <p key={idx} className="text-foreground leading-relaxed">
                      {paragraph}
                    </p>
                  ))}
                </div>
              </div>
            </section>
          ))}
        </div>

        {/* CTA Section */}
        <section className="max-w-3xl mx-auto mt-16 p-8 rounded-2xl bg-gradient-to-r from-primary/10 to-accent/10 border border-border text-center">
          <h2 className="text-2xl font-bold mb-4">רכשתם Nintendo Switch 2?</h2>
          <p className="text-muted-foreground mb-6">הפעילו את האחריות שלכם עכשיו</p>
          <Link to="/warranty">
            <Button className="btn-hero">
              <span>רישום אחריות</span>
              <ArrowRight className="h-5 w-5 rotate-180" />
            </Button>
          </Link>
        </section>
      </main>
    </div>
  );
};

export default NintendoSwitch2Manual;



'use client';

import React, { useState } from 'react';
import { useFirestore, useCollection, useMemoFirebase } from '@/firebase';
import { collection, query, orderBy, limit } from 'firebase/firestore';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { 
  Smartphone, 
  CheckCircle, 
  Search, 
  MapPin, 
  PhoneCall, 
  Globe,
  MessageSquare,
  Phone,
  Filter,
  Zap,
  BarChart3,
  CheckCircle2,
  ChevronDown,
  ChevronUp,
  Briefcase,
  Users,
  ChevronRight,
  Building2,
  X,
  ArrowRight,
  Languages
} from 'lucide-react';
import Link from 'next/link';
import Image from 'next/image';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription, DialogFooter } from '@/components/ui/dialog';
import { ScrollArea } from '@/components/ui/scroll-area';
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from '@/components/ui/dropdown-menu';

interface Job {
  id: string;
  title: string;
  company: string;
  location: string;
  type: string;
  description: string;
  requirements?: string;
  logoUrl?: string;
  bannerUrl?: string;
  salary?: string;
}

type Language = 'en' | 'ta' | 'hi' | 'te' | 'ml';

const translations = {
  en: {
    brandName: 'Ayush Jobs',
    brandSub: 'Holistic Career Growth',
    candidate: 'Candidate',
    recruiter: 'Recruiter',
    heroTitle: 'Entry level Sales, Service and Manufacturing jobs',
    heroDesc1: 'Use app in multiple languages',
    heroDesc2: 'Discover jobs from multiple industries',
    scanQr: 'Scan the QR code with your mobile to download Ayush Jobs app & get instant updates',
    qrCode: 'QR CODE',
    exploreTitle: 'Explore Sales, Service and Manufacturing jobs',
    feature1Title: 'Verified Recruiters',
    feature1Desc: 'Our screening process allows only verified job providers.',
    feature2Title: 'Multi-language',
    feature2Desc: 'You can use the app easily in your mother tongue.',
    feature3Title: 'Talk to HRs Directly',
    feature3Desc: 'Call recruiters directly to know your interview status.',
    feature4Title: 'Location Features',
    feature4Desc: 'Find jobs nearby using advanced map & distance filters.',
    recentOpenings: 'Recent Openings',
    viewDetails: 'View Details',
    noJobs: 'No recent jobs found. Check back soon!',
    qualifications: 'Qualification based jobs',
    jobTypes: 'Job Types',
    recruiterHeroTitle: 'Hire the best talent for your business',
    recruiterHeroDesc1: 'Get access to a large pool of candidates',
    recruiterHeroDesc2: 'Reduce hiring time & employ the best',
    enterMobile: 'Enter your mobile number',
    registerNow: 'Register Now',
    enterpriseLogin: 'Click here for Enterprise login',
    liveOnlyTN: 'We are currently live only in Tamil Nadu',
    hiringPartners: 'Our Hiring Partners',
    hireLocTitle: 'Hire candidates based on their location',
    hireLocDesc: 'Want to hire candidates from a particular locality? Our advanced filters can help you find candidates suiting your requirements in any specific locality.',
    directContactTitle: 'Candidates can contact you directly',
    directContactDesc: 'We prompt the users to connect with you directly over call allowing for a faster screening & hiring process.',
    vernacularTitle: 'Easy-to-use multi-language app, more local candidates',
    vernacularDesc: 'Our easy-to-use vernacular app helps more regional job seekers to register, thereby giving you a larger database of candidates to choose from.',
    benefitHeading: 'We help you find the best candidates who fit your requirements',
    benefit1Title: 'Easier & faster screening',
    benefit1Desc: 'Candidate Match Score can help you easily find the best candidates for your requirement.',
    benefit2Title: '2x faster hiring',
    benefit2Desc: 'Directly contact the best talent through our various communication channels to complete your hiring 2x faster.',
    benefit3Title: 'Filters to find the best candidates',
    benefit3Desc: 'Filters based on skills, education & salary expectation can help you find candidates.',
    rolesTitle: 'Hire for 50+ different roles',
    registerForFree: 'REGISTER FOR FREE',
    localityTitle: 'Hire from any locality',
    localityDesc: 'Our platform provide you with the opportunity to search for professional talent in any specific locality and hire the best candidates.',
    faqs: 'FAQs',
    faqAns: 'Answers to these questions are available in our recruiter help documentation. Generally, registration is free and involves email verification.',
    finalCtaTitle: 'Post a job and get applications from the best candidates',
    finalCtaDesc: 'Our platform has an extensive pool of registered talent looking for job opportunities.',
    confirmApply: 'Confirm & Apply Now',
    close: 'Close',
    salary: 'Salary',
    jobType: 'Job Type',
    location: 'Location',
    requirements: 'Candidate Requirements',
    jobDescription: 'Job Description'
  },
  ta: {
    brandName: 'ஆயுஷ் வேலைகள்',
    brandSub: 'முழுமையான தொழில் வளர்ச்சி',
    candidate: 'விண்ணப்பதாரர்',
    recruiter: 'ஆட்சேர்ப்பு செய்பவர்',
    heroTitle: 'விற்பனை, சேவை மற்றும் உற்பத்தி சார்ந்த ஆரம்ப நிலை வேலைகள்',
    heroDesc1: 'பல மொழிகளில் பயன்பாட்டைப் பயன்படுத்தவும்',
    heroDesc2: 'பல தொழில்துறைகளிலிருந்து வேலைகளைக் கண்டறியவும்',
    scanQr: 'ஆயுஷ் ஜாப்ஸ் செயலியைப் பதிவிறக்கவும் மற்றும் உடனடி அறிவிப்புகளைப் பெறவும் உங்கள் மொபைல் மூலம் QR குறியீட்டை ஸ்கேன் செய்யவும்',
    qrCode: 'QR குறியீடு',
    exploreTitle: 'விற்பனை, சேவை மற்றும் உற்பத்தி வேலைகளை ஆராயுங்கள்',
    feature1Title: 'சரிபார்க்கப்பட்ட ஆட்சேர்ப்பு செய்பவர்கள்',
    feature1Desc: 'எங்கள் ஸ்கிரீனிங் செயல்முறை சரிபார்க்கப்பட்ட வேலை வழங்குநர்களை மட்டுமே அனுமதிக்கிறது.',
    feature2Title: 'பல மொழிகள்',
    feature2Desc: 'உங்கள் தாய்மொழியில் பயன்பாட்டை எளிதாகப் பயன்படுத்தலாம்.',
    feature3Title: 'HR-களுடன் நேரடியாகப் பேசுங்கள்',
    feature3Desc: 'உங்கள் நேர்காணல் நிலையை அறிய நேரடியாக ஆட்சேர்ப்பு செய்பவர்களை அழைக்கவும்.',
    feature4Title: 'இருப்பிட அம்சங்கள்',
    feature4Desc: 'மேம்பட்ட வரைபடம் மற்றும் தூர வடிப்பான்களைப் பயன்படுத்தி அருகிலுள்ள வேலைகளைக் கண்டறியவும்.',
    recentOpenings: 'சமீபத்திய வேலைவாய்ப்புகள்',
    viewDetails: 'விவரங்களைப் பார்க்கவும்',
    noJobs: 'சமீபத்திய வேலைகள் எதுவும் கிடைக்கவில்லை. விரைவில் மீண்டும் சரிபார்க்கவும்!',
    qualifications: 'கல்வித்தகுதி அடிப்படையிலான வேலைகள்',
    jobTypes: 'வேலை வகைகள்',
    recruiterHeroTitle: 'உங்கள் வணிகத்திற்கான சிறந்த திறமையாளர்களை நியமிக்கவும்',
    recruiterHeroDesc1: 'விண்ணப்பதாரர்களின் பெரிய தரவுத்தளத்தை அணுகவும்',
    recruiterHeroDesc2: 'ஆட்சேர்ப்பு நேரத்தைக் குறைத்து சிறந்தவர்களை நியமிக்கவும்',
    enterMobile: 'உங்கள் மொபைல் எண்ணை உள்ளிடவும்',
    registerNow: 'இப்போதே பதிவு செய்யுங்கள்',
    enterpriseLogin: 'நிறுவன உள்நுழைவுக்கு இங்கே கிளிக் செய்யவும்',
    liveOnlyTN: 'நாங்கள் தற்போது தமிழ்நாட்டில் மட்டுமே சேவையாற்றுகிறோம்',
    hiringPartners: 'எங்கள் ஆட்சேர்ப்பு பங்காளிகள்',
    hireLocTitle: 'விண்ணப்பதாரர்களின் இருப்பிடத்தின் அடிப்படையில் நியமிக்கவும்',
    hireLocDesc: 'ஒரு குறிப்பிட்ட பகுதியிலிருந்து விண்ணப்பதாரர்களை நியமிக்க வேண்டுமா? எங்கள் மேம்பட்ட வடிப்பான்கள் உங்கள் தேவைகளுக்கு ஏற்ற விண்ணப்பதாரர்களைக் கண்டறிய உதவும்.',
    directContactTitle: 'விண்ணப்பதாரர்கள் உங்களை நேரடியாகத் தொடர்பு கொள்ளலாம்',
    directContactDesc: 'வேகமான ஸ்கிரீனிங் மற்றும் ஆட்சேர்ப்பு செயல்முறைக்கு அழைப்பு மூலம் நேரடியாக உங்களைத் தொடர்பு கொள்ள பயனர்களை நாங்கள் தூண்டுகிறோம்.',
    vernacularTitle: 'எளிதாகப் பயன்படுத்தக்கூடிய பல மொழி செயலி, அதிக உள்ளூர் விண்ணப்பதாரர்கள்',
    vernacularDesc: 'எங்கள் எளிதாகப் பயன்படுத்தக்கூடிய உள்ளூர் மொழி செயலி அதிக பிராந்திய வேலை தேடுபவர்களைப் பதிவு செய்ய உதவுகிறது, இதன் மூலம் உங்களுக்கு அதிக விண்ணப்பதாரர்கள் கிடைக்கின்றனர்.',
    benefitHeading: 'உங்கள் தேவைகளுக்குப் பொருந்தக்கூடிய சிறந்த விண்ணப்பதாரர்களைக் கண்டறிய நாங்கள் உதவுகிறோம்',
    benefit1Title: 'எளிதான மற்றும் வேகமான ஸ்கிரீனிங்',
    benefit1Desc: 'விண்ணப்பதாரர் பொருத்தம் மதிப்பெண் உங்கள் தேவைக்கு சிறந்தவர்களை எளிதாகக் கண்டறிய உதவும்.',
    benefit2Title: '2 மடங்கு வேகமான ஆட்சேர்ப்பு',
    benefit2Desc: 'உங்கள் ஆட்சேர்ப்பை 2 மடங்கு வேகமாக முடிக்க பல்வேறு தொடர்பு சேனல்கள் மூலம் சிறந்த திறமையாளர்களை நேரடியாகத் தொடர்பு கொள்ளுங்கள்.',
    benefit3Title: 'சிறந்த விண்ணப்பதாரர்களைக் கண்டறிய வடிப்பான்கள்',
    benefit3Desc: 'திறன்கள், கல்வி மற்றும் சம்பள எதிர்பார்ப்பு ஆகியவற்றின் அடிப்படையில் வடிப்பான்கள் விண்ணப்பதாரர்களைக் கண்டறிய உதவும்.',
    rolesTitle: '50+ வெவ்வேறு பணிகளுக்கு ஆட்களை நியமிக்கவும்',
    registerForFree: 'இலவசமாகப் பதிவு செய்யுங்கள்',
    localityTitle: 'எந்தப் பகுதியிலிருந்தும் ஆட்களை நியமிக்கவும்',
    localityDesc: 'எந்தவொரு குறிப்பிட்ட பகுதியிலும் தொழில்முறை திறமைகளைத் தேடி சிறந்த விண்ணப்பதாரர்களை நியமிப்பதற்கான வாய்ப்பை எங்கள் தளம் வழங்குகிறது.',
    faqs: 'அடிக்கடி கேட்கப்படும் கேள்விகள் (FAQs)',
    faqAns: 'இந்தக் கேள்விகளுக்கான பதில்கள் எங்கள் ஆட்சேர்ப்பு உதவி ஆவணங்களில் கிடைக்கின்றன. பொதுவாக, பதிவு இலவசம் மற்றும் மின்னஞ்சல் சரிபார்ப்பை உள்ளடக்கியது.',
    finalCtaTitle: 'வேலை வாய்ப்பை பதிவிட்டு சிறந்த விண்ணப்பதாரர்களிடமிருந்து விண்ணப்பங்களைப் பெறுங்கள்',
    finalCtaDesc: 'எங்கள் தளத்தில் வேலை வாய்ப்புகளைத் தேடும் பதிவு செய்யப்பட்ட திறமையாளர்களின் பெரிய தரவுத்தளம் உள்ளது.',
    confirmApply: 'உறுதி செய்து விண்ணப்பிக்கவும்',
    close: 'மூடு',
    salary: 'சம்பளம்',
    jobType: 'வேலை வகை',
    location: 'இருப்பிடம்',
    requirements: 'விண்ணப்பதாரர் தேவைகள்',
    jobDescription: 'வேலை விவரம்'
  },
  hi: {
    brandName: 'आयुष नौकरियां',
    brandSub: 'समग्र करियर विकास',
    candidate: 'उम्मीदवार',
    recruiter: 'नियोक्ता',
    heroTitle: 'एंट्री लेवल सेल्स, सर्विस और मैन्युफैक्चरिंग नौकरियां',
    heroDesc1: 'एप्लिकेशन का उपयोग कई भाषाओं में करें',
    heroDesc2: 'विभिन्न उद्योगों से नौकरियां खोजें',
    scanQr: 'आयुष जॉब्स ऐप डाउनलोड करने और तुरंत अपडेट पाने के लिए अपने मोबाइल से क्यूआर कोड स्कैन करें',
    qrCode: 'क्यूआर कोड',
    exploreTitle: 'सेल्स, सर्विस और मैन्युफैक्चरिंग नौकरियों का पता लगाएं',
    feature1Title: 'सत्यापित नियोक्ता',
    feature1Desc: 'हमारी स्क्रीनिंग प्रक्रिया केवल सत्यापित नौकरी प्रदाताओं को अनुमति देती है।',
    feature2Title: 'बहुभाषी',
    feature2Desc: 'आप अपनी मातृभाषा में ऐप का आसानी से उपयोग कर सकते हैं।',
    feature3Title: 'सीधे HR से बात करें',
    feature3Desc: 'अपनी इंटरव्यू स्थिति जानने के लिए सीधे नियोक्ताओं को कॉल करें।',
    feature4Title: 'स्थान विशेषताएं',
    feature4Desc: 'उन्नत मानचित्र और दूरी फिल्टर का उपयोग करके पास की नौकरियां खोजें।',
    recentOpenings: 'हाल की रिक्तियां',
    viewDetails: 'विवरण देखें',
    noJobs: 'कोई हालिया नौकरी नहीं मिली। जल्द ही वापस देखें!',
    qualifications: 'योग्यता आधारित नौकरियां',
    jobTypes: 'नौकरी के प्रकार',
    recruiterHeroTitle: 'अपने व्यवसाय के लिए सर्वश्रेष्ठ प्रतिभा खोजें',
    recruiterHeroDesc1: 'उम्मीदवारों के एक बड़े समूह तक पहुंच प्राप्त करें',
    recruiterHeroDesc2: 'हायरिंग समय कम करें और सर्वश्रेष्ठ को नियुक्त करें',
    enterMobile: 'अपना मोबाइल नंबर दर्ज करें',
    registerNow: 'अभी पंजीकरण करें',
    enterpriseLogin: 'एंटरप्राइज लॉगिन के लिए यहां क्लिक करें',
    liveOnlyTN: 'हम वर्तमान में केवल तमिलनाडु में लाइव हैं',
    hiringPartners: 'हमारे हायरिंग पार्टनर्स',
    hireLocTitle: 'स्थान के आधार पर उम्मीदवारों को नियुक्त करें',
    hireLocDesc: 'क्या आप किसी विशेष क्षेत्र से उम्मीदवारों को नियुक्त करना चाहते हैं? हमारे फिल्टर आपको सही उम्मीदवार खोजने में मदद करेंगे।',
    directContactTitle: 'उम्मीदवार आपसे सीधे संपर्क कर सकते हैं',
    directContactDesc: 'हम तेज स्क्रीनिंग और हायरिंग प्रक्रिया के लिए उपयोगकर्ताओं को कॉल पर आपसे सीधे जुड़ने के लिए प्रेरित करते।',
    vernacularTitle: 'बहुभाषी ऐप, अधिक स्थानीय उम्मीदवार',
    vernacularDesc: 'हमारा बहुभाषी ऐप अधिक क्षेत्रीय नौकरी चाहने वालों को पंजीकरण करने में मदद करता है।',
    benefitHeading: 'हम आपकी आवश्यकताओं के अनुरूप सर्वश्रेष्ठ उम्मीदवार खोजने में मदद करते हैं',
    benefit1Title: 'आसान और तेज़ स्क्रीनिंग',
    benefit1Desc: 'कैंडिडेट मैच स्कोर आपको अपनी आवश्यकता के लिए सर्वश्रेष्ठ उम्मीदवारों को आसानी से खोजने में मदद कर सकता है।',
    benefit2Title: '2 गुणा तेज़ हायरिंग',
    benefit2Desc: 'विभिन्न संचार चैनलों के माध्यम से सीधे सर्वश्रेष्ठ प्रतिभा से संपर्क करें।',
    benefit3Title: 'सर्वश्रेष्ठ उम्मीदवारों को खोजने के लिए फिल्टर',
    benefit3Desc: 'कौशल, शिक्षा और वेतन अपेक्षा के आधार पर फिल्टर उम्मीदवारों को खोजने में मदद करते हैं।',
    rolesTitle: '50+ विभिन्न भूमिकाओं के लिए हायर करें',
    registerForFree: 'मुफ्त में पंजीकरण करें',
    localityTitle: 'किसी भी इलाके से हायर करें',
    localityDesc: 'हमारा प्लेटफॉर्म आपको किसी भी विशेष इलाके में पेशेवर प्रतिभा खोजने का अवसर प्रदान करता है।',
    faqs: 'सामान्य प्रश्न (FAQs)',
    faqAns: 'इन सवालों के जवाब हमारे नियोक्ता सहायता दस्तावेजों में उपलब्ध हैं। पंजीकरण आमतौर पर मुफ्त है।',
    finalCtaTitle: 'नौकरी पोस्ट करें और सर्वश्रेष्ठ उम्मीदवारों से आवेदन प्राप्त करें',
    finalCtaDesc: 'हमारे प्लेटफॉर्म पर नौकरी के अवसरों की तलाश करने वाली पंजीकृत प्रतिभाओं का एक विस्तृत समूह है।',
    confirmApply: 'पुष्टि करें और अभी आवेदन करें',
    close: 'बंद करें',
    salary: 'वेतन',
    jobType: 'नौकरी का प्रकार',
    location: 'स्थान',
    requirements: 'उम्मीदवार की आवश्यकताएं',
    jobDescription: 'नौकरी का विवरण'
  },
  te: {
    brandName: 'ఆయుష్ ఉద్యోగాలు',
    brandSub: 'సమగ్ర కెరీర్ వృద్ధి',
    candidate: 'అభ్యర్థి',
    recruiter: 'రిక్రూటర్',
    heroTitle: 'ఎంట్రీ లెవల్ సేల్స్, సర్వీస్ మరియు మాన్యుఫ్యాక్చరింగ్ ఉద్యోగాలు',
    heroDesc1: 'బహుళ భాషలలో యాప్‌ను ఉపయోగించండి',
    heroDesc2: 'బహుళ పరిశ్రమల నుండి ఉద్యోగాలను కనుగొనండి',
    scanQr: 'ఆయుష్ జాబ్స్ యాప్‌ని డౌన్‌లోడ్ చేయడానికి మరియు తక్షణ అప్‌డేట్‌లను పొందడానికి మీ మొబైల్‌తో QR కోడ్‌ని స్కాన్ చేయండి',
    qrCode: 'QR కోడ్',
    exploreTitle: 'సేల్స్, సర్వీస్ మరియు మాన్యుఫ్యాక్చరింగ్ ఉద్యోగాలను అన్వేషించండి',
    feature1Title: 'ధృవీకరించబడిన రిక్రూటర్లు',
    feature1Desc: 'మా స్క్రీనింగ్ ప్రక్రియ ధృవీకరించబడిన ఉద్యోగ ప్రదాతలను మాత్రమే అనుమతిస్తుంది.',
    feature2Title: 'బహుళ భాషలు',
    feature2Desc: 'మీరు మీ మాతృభాషలో యాప్‌ని సులభంగా ఉపయోగించవచ్చు.',
    feature3Title: 'HR లతో నేరుగా మాట్లాడండి',
    feature3Desc: 'మీ ఇంటర్వ్యూ స్థితిని తెలుసుకోవడానికి నేరుగా రిక్రూటర్లకు కాల్ చేయండి.',
    feature4Title: 'స్థాన ఫీచర్లు',
    feature4Desc: 'అడ్వాన్స్‌డ్ మ్యాప్ మరియు దూరం ఫిల్టర్‌లను ఉపయోగించి సమీపంలోని ఉద్యోగాలను కనుగొనండి.',
    recentOpenings: 'ఇటీవలి ఓపెనింగ్స్',
    viewDetails: 'వివరాలు చూడండి',
    noJobs: 'ఇటీవలి ఉద్యోగాలు ఏవీ కనుగొనబడలేదు. త్వరలో మళ్ళీ చూడండి!',
    qualifications: 'అర్హత ఆధారిత ఉద్యోగాలు',
    jobTypes: 'ఉద్యోగ రకాలు',
    recruiterHeroTitle: 'మీ వ్యాపారం కోసం ఉత్తమ ప్రతిభను నియమించుకోండి',
    recruiterHeroDesc1: 'పెద్ద సంఖ్యలో అభ్యర్థుల డేటాబేస్కు యాక్సెస్ పొందండి',
    recruiterHeroDesc2: 'హైరింగ్ సమయాన్ని తగ్గించండి మరియు ఉత్తమ ప్రతిభను నియమించుకోండి',
    enterMobile: 'మీ మొబైల్ నంబర్‌ను నమోదు చేయండి',
    registerNow: 'ఇప్పుడే నమోదు చేసుకోండి',
    enterpriseLogin: 'ఎంటర్‌ప్రైజ్ లాగిన్ కోసం ఇక్కడ క్లిక్ చేయండి',
    liveOnlyTN: 'మేము ప్రస్తుతం తమిళనాడులో మాత్రమే అందుబాటులో ఉన్నాము',
    hiringPartners: 'మా హైరింగ్ భాగస్వాములు',
    hireLocTitle: 'వారి స్థానం ఆధారంగా అభ్యర్థులను నియమించుకోండి',
    hireLocDesc: 'మీరు ఒక నిర్దిష్ట ప్రాంతం నుండి అభ్యర్థులను నియమించుకోవాలనుకుంటున్నారా? మా ఫిల్టర్లు మీకు సహాయపడతాయి.',
    directContactTitle: 'అభ్యర్థులు మిమ్మల్ని నేరుగా సంప్రదించవచ్చు',
    directContactDesc: 'వేగవంతమైన స్క్రీనింగ్ మరియు హైరింగ్ ప్రక్రియ కోసం వినియోగదారులు నేరుగా కాల్ ద్వారా మిమ్మల్ని సంప్రదించేలా మేము ప్రోత్సహిస్తాము.',
    vernacularTitle: 'బహుళ భాషా యాప్, ఎక్కువ స్థానిక అభ్యర్థులు',
    vernacularDesc: 'మా యాప్ ఎక్కువ మంది ప్రాంతీయ ఉద్యోగార్ధులు నమోదు చేసుకోవడానికి సహాయపడుతుంది.',
    benefitHeading: 'మీ అవసరాలకు సరిపోయే ఉత్తమ అభ్యర్థులను కనుగొనడంలో మేము సహాయం చేస్తాము',
    benefit1Title: 'సులభమైన మరియు వేగవంతమైన స్క్రీనింగ్',
    benefit1Desc: 'క్యాండిడేట్ మ్యాచ్ స్కోర్ మీ అవసరానికి తగిన అభ్యర్థులను సులభంగా కనుగొనడంలో సహాయపడుతుంది.',
    benefit2Title: '2 రెట్లు వేగవంతమైన హైరింగ్',
    benefit2Desc: 'వివిధ కమ్యూనికేషన్ ఛానెల్‌ల ద్వారా నేరుగా ఉత్తమ ప్రతిభను సంప్రదించండి.',
    benefit3Title: 'ఉత్తమ అభ్యర్థులను కనుగొనడానికి ఫిల్టర్లు',
    benefit3Desc: 'నైపుణ్యాలు, విద్య మరియు జీతం అంచనాల ఆధారంగా ఫిల్టర్లు అభ్యర్థులను కనుగొనడంలో సహాయపడతాయి.',
    rolesTitle: '50+ విభిన్న పాత్రల కోసం హైర్ చేయండి',
    registerForFree: 'ఉచితంగా నమోదు చేసుకోండి',
    localityTitle: 'ఏ ప్రాంతం నుండి అయినా హైర్ చేయండి',
    localityDesc: 'ఏదైనా నిర్దిష్ట ప్రాంతంలో వృత్తిపరమైన ప్రతిభను వెతకడానికి మరియు ఉత్తమ అభ్యర్థులను నియమించుకోవడానికి మా ప్లాట్‌ఫారమ్ అవకాశం కల్పిస్తుంది.',
    faqs: 'తరచుగా అడిగే ప్రశ్నలు (FAQs)',
    faqAns: 'ఈ ప్రశ్నలకు సమాధానాలు మా రిక్రూటర్ సహాయ పత్రాలలో అందుబాటులో ఉన్నాయి. సాధారణంగా నమోదు ఉచితం.',
    finalCtaTitle: 'ఉద్యోగాన్ని పోస్ట్ చేయండి మరియు ఉత్తమ అభ్యర్థుల నుండి దరఖాస్తులను పొందండి',
    finalCtaDesc: 'మా ప్లాట్‌ఫారమ్‌లో ఉద్యోగ అవకాశాల కోసం వెతుకుతున్న నమోదిత ప్రతిభావంతుల పెద్ద సమూహం ఉంది.',
    confirmApply: 'ధృవీకరించండి మరియు ఇప్పుడే దరఖాస్తు చేయండి',
    close: 'ముగించు',
    salary: 'జీతం',
    jobType: 'ఉద్యోగ రకం',
    location: 'స్థానం',
    requirements: 'అభ్యర్థి అవసరాలు',
    jobDescription: 'ఉద్యోగ వివరణ'
  },
  ml: {
    brandName: 'ആയുഷ് ജോബ്സ്',
    brandSub: 'സമഗ്രമായ കരിയർ വളർച്ച',
    candidate: 'ഉദ്യോഗാർത്ഥി',
    recruiter: 'റിക്രൂട്ടർ',
    heroTitle: 'എൻട്രി ലെവൽ സെയിൽസ്, സർവീസ്, മാനുഫാക്ചറിംഗ് ജോലികൾ',
    heroDesc1: 'ആപ്പ് ഒന്നിലധികം ഭാഷകളിൽ ഉപയോഗിക്കുക',
    heroDesc2: 'വിവിധ വ്യവസായങ്ങളിൽ നിന്നുള്ള ജോലികൾ കണ്ടെത്തുക',
    scanQr: 'ആയുഷ് ജോബ്സ് ആപ്പ് ഡൗൺലോഡ് ചെയ്യുന്നതിനും തൽക്ഷണ അപ്‌ഡേറ്റുകൾ ലഭിക്കുന്നതിനും നിങ്ങളുടെ മൊബൈൽ ഉപയോഗിച്ച് QR കോഡ് സ്കാൻ ചെയ്യുക',
    qrCode: 'QR കോഡ്',
    exploreTitle: 'സെയിൽസ്, സർവീസ്, മാനുഫാക്ചറിംഗ് ജോലികൾ പര്യവേക്ഷണം ചെയ്യുക',
    feature1Title: 'പരിശോധിക്കപ്പെട്ട റിക്രൂട്ടർമാർ',
    feature1Desc: 'ഞങ്ങളുടെ സ്ക്രീനിംഗ് പ്രക്രിയ പരിശോധിക്കപ്പെട്ട തൊഴിൽ ദാതാക്കളെ മാത്രമേ അനുവദിക്കൂ.',
    feature2Title: 'ബഹുഭാഷാ പിന്തുണ',
    feature2Desc: 'നിങ്ങളുടെ മാതൃഭാഷയിൽ ആപ്പ് എളുപ്പത്തിൽ ഉപയോഗിക്കാം.',
    feature3Title: 'HR-കളുമായി നേരിട്ട് സംസാരിക്കുക',
    feature3Desc: 'നിങ്ങളുടെ ഇന്റർവ്യൂ നില അറിയാൻ നേരിട്ട് റിക്രൂട്ടർമാരെ വിളിക്കുക.',
    feature4Title: 'ലൊക്കേഷൻ സവിശേഷതകൾ',
    feature4Desc: 'അഡ്വാൻസ്ഡ് മാപ്പും ദൂര ഫിൽട്ടറുകളും ഉപയോഗിച്ച് അടുത്തുള്ള ജോലികൾ കണ്ടെത്തുക.',
    recentOpenings: 'സമീപകാല തൊഴിലവസരങ്ങൾ',
    viewDetails: 'വിവരങ്ങൾ കാണുക',
    noJobs: 'സമീപകാല ജോലികളൊന്നും കണ്ടെത്തിയില്ല. ഉടൻ വീണ്ടും പരിശോധിക്കുക!',
    qualifications: 'യോഗ്യത അടിസ്ഥാനമാക്കിയുള്ള ജോലികൾ',
    jobTypes: 'ജോലി തരങ്ങൾ',
    recruiterHeroTitle: 'നിങ്ങളുടെ ബിസിനസ്സിനായി മികച്ച പ്രതിഭകളെ കണ്ടെത്തുക',
    recruiterHeroDesc1: 'ഉദ്യോഗാർത്ഥികളുടെ വലിയൊരു വിഭാഗത്തിലേക്ക് പ്രവേശനം നേടുക',
    recruiterHeroDesc2: 'റിക്രൂട്ട്‌മെന്റ് സമയം കുറയ്ക്കുകയും മികച്ചവരെ നിയമിക്കുകയും ചെയ്യുക',
    enterMobile: 'നിങ്ങളുടെ മൊബൈൽ നമ്പർ നൽകുക',
    registerNow: 'ഇപ്പോൾ രജിസ്റ്റർ ചെയ്യുക',
    enterpriseLogin: 'എന്റർപ്രൈസ് ലോഗിൻ ചെയ്യുന്നതിന് ഇവിടെ ക്ലിക്ക് ചെയ്യുക',
    liveOnlyTN: 'ഞങ്ങൾ നിലവിൽ തമിഴ്‌നാട്ടിൽ മാത്രമേ ലഭ്യമാകൂ',
    hiringPartners: 'ഞങ്ങളുടെ റിക്രൂട്ട്‌മെന്റ് പങ്കാളികൾ',
    hireLocTitle: 'ലൊക്കേഷൻ അടിസ്ഥാനമാക്കി ഉദ്യോഗാർത്ഥികളെ നിയമിക്കുക',
    hireLocDesc: 'ഒരു പ്രത്യേക പ്രദേശത്ത് നിന്നുള്ള ഉദ്യോഗാർത്ഥികളെ നിയമിക്കണോ? ഞങ്ങളുടെ ഫിൽട്ടറുകൾ നിങ്ങളെ സഹായിക്കും.',
    directContactTitle: 'ഉദ്യോഗാർത്ഥികൾക്ക് നിങ്ങളെ നേരിട്ട് ബന്ധപ്പെടാം',
    directContactDesc: 'വേഗത്തിലുള്ള സ്ക്രീനിംഗിനും നിയമനത്തിനുമായി ഉദ്യോഗാർത്ഥികൾ നിങ്ങളെ നേരിട്ട് വിളിക്കാൻ ഞങ്ങൾ പ്രോത്സാഹിപ്പിക്കുന്നു.',
    vernacularTitle: 'ബഹുഭാഷാ ആപ്പ്, കൂടുതൽ പ്രാദേശിക ഉദ്യോഗാർത്ഥികൾ',
    vernacularDesc: 'ഞങ്ങളുടെ ബഹുഭാഷാ ആപ്പ് കൂടുതൽ പ്രാദേശിക ഉദ്യോഗാർത്ഥികളെ രജിസ്റ്റർ ചെയ്യാൻ സഹായിക്കുന്നു.',
    benefitHeading: 'നിങ്ങളുടെ ആവശ്യങ്ങൾക്ക് അനുയോജ്യമായ മികച്ച ഉദ്യോഗാർത്ഥികളെ കണ്ടെത്താൻ ഞങ്ങൾ സഹായിക്കുന്നു',
    benefit1Title: 'എളുപ്പത്തിലുള്ള സ്ക്രീനിംഗ്',
    benefit1Desc: 'നിങ്ങളുടെ ആവശ്യത്തിന് അനുയോജ്യമായവരെ കണ്ടെത്താൻ കാൻഡിഡേറ്റ് മാച്ച് സ്കോർ സഹായിക്കും.',
    benefit2Title: '2 മടങ്ങ് വേഗത്തിലുള്ള നിയമനം',
    benefit2Desc: 'വിവിധ ആശയവിനിമയ ചാനലുകളിലൂടെ നേരിട്ട് മികച്ച പ്രതിഭകളെ ബന്ധപ്പെടുക.',
    benefit3Title: 'മികച്ച ഉദ്യോഗാർത്ഥികളെ കണ്ടെത്താൻ ഫിൽട്ടറുകൾ',
    benefit3Desc: 'കഴിവ്, വിദ്യാഭ്യാസം, ശമ്പളം എന്നിവയുടെ അടിസ്ഥാനത്തിലുള്ള ഫിൽട്ടറുകൾ ഉദ്യോഗാർത്ഥികളെ കണ്ടെത്താൻ സഹായിക്കുന്നു.',
    rolesTitle: '50+ വ്യത്യസ്ത തസ്തികകളിലേക്ക് നിയമനം നടത്തുക',
    registerForFree: 'സൗജന്യമായി രജിസ്റ്റർ ചെയ്യുക',
    localityTitle: 'ഏത് പ്രദേശത്ത് നിന്നും നിയമനം നടത്തുക',
    localityDesc: 'ഏതെങ്കിലും പ്രത്യേക പ്രദേശത്തുള്ള പ്രൊഫഷണൽ പ്രതിഭകളെ തിരയാനും നിയമിക്കാനും ഞങ്ങളുടെ പ്ലാറ്റ്ഫോം അവസരം നൽകുന്നു.',
    faqs: 'സാധാരണ ചോദ്യങ്ങൾ (FAQs)',
    faqAns: 'ഈ ചോദ്യങ്ങൾക്കുള്ള ഉത്തരങ്ങൾ ഞങ്ങളുടെ റിക്രൂട്ടർ ഹെൽപ്പ് ഡോക്യുമെന്റുകളിൽ ലഭ്യമാണ്.',
    finalCtaTitle: 'ജോലി പോസ്റ്റ് ചെയ്യുക, മികച്ച ഉദ്യോഗാർത്ഥികളിൽ നിന്ന് അപേക്ഷകൾ സ്വീകരിക്കുക',
    finalCtaDesc: 'തൊഴിലവസരങ്ങൾ തേടുന്ന രജിസ്റ്റർ ചെയ്ത നിരവധി പ്രതിഭകൾ ഞങ്ങളുടെ പ്ലാറ്റ്‌ഫോമിലുണ്ട്.',
    confirmApply: 'സ്ഥിരീകരിച്ച് ഇപ്പോൾ അപേക്ഷിക്കുക',
    close: 'അടയ്ക്കുക',
    salary: 'ശമ്പളം',
    jobType: 'ജോലി തരം',
    location: 'ലൊക്കേഷൻ',
    requirements: 'ഉദ്യോഗാർത്ഥി യോഗ്യതകൾ',
    jobDescription: 'ജോലി വിവരണം'
  }
};

const languages = [
  { code: 'en', name: 'English' },
  { code: 'ta', name: 'தமிழ்' },
  { code: 'hi', name: 'हिन्दी' },
  { code: 'te', name: 'తెలుగు' },
  { code: 'ml', name: 'മലയാളം' }
];

export default function JobPortalPage() {
  const [view, setView] = useState<'candidate' | 'recruiter'>('candidate');
  const [lang, setLang] = useState<Language>('en');
  const [openFaq, setOpenFaq] = useState<number | null>(null);
  const [selectedJob, setSelectedJob] = useState<Job | null>(null);
  const firestore = useFirestore();

  const t = translations[lang];

  // Fetch recent jobs for the candidate view
  const jobsQuery = useMemoFirebase(() => {
    if (!firestore) return null;
    return query(collection(firestore, 'jobs'), orderBy('createdAt', 'desc'), limit(6));
  }, [firestore]);

  const { data: recentJobs, isLoading: isLoadingJobs } = useCollection<Job>(jobsQuery);

  const roles = [
    'Ayurvedic Consultant', 'Yoga Instructor', 'Panchakarma Tech', 'Wellness Sales', 
    'Research Associate', 'Clinical Pharmacist', 'Manufacturing Head', 'Quality Control'
  ];

  const locations = [
    'Chennai', 'Tiruvallur', 'Vellore', 'Tiruchirappalli', 'Madurai', 
    'Coimbatore', 'Erode', 'Tiruppur', 'Namakkal', 'Kanchipuram'
  ];

  const faqs = [
    "Are there any charges for creating a Recruiter profile and posting jobs?",
    "How do I create a Recruiter profile on the website?",
    "Do I need to verify my account before posting the job?",
    "How do I post Jobs on the website?",
    "Why is my job under review?",
    "Which cities and states do we serve currently?"
  ];

  return (
    <main className="min-h-screen bg-white font-sans">
      {/* 1. NAVIGATION / TOGGLE BAR */}
      <nav className="fixed top-0 left-0 right-0 z-30 bg-white/95 backdrop-blur-md border-b border-slate-100 py-4 shadow-sm">
        <div className="container mx-auto px-6 flex justify-between items-center max-w-7xl">
          <div className="flex flex-col">
            <Link href="/" className="flex flex-col">
              <h1 className="text-xl md:text-2xl font-black text-primary tracking-tighter uppercase leading-none">{t.brandName}</h1>
              <p className="text-[8px] md:text-[10px] font-black uppercase text-slate-400 tracking-widest mt-1">{t.brandSub}</p>
            </Link>
          </div>

          <div className="flex items-center gap-2 md:gap-4">
            {/* Language Switcher */}
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="ghost" size="sm" className="rounded-full gap-2 font-black text-[10px] uppercase tracking-widest">
                  <Languages size={16} className="text-primary" />
                  <span className="hidden sm:inline">{languages.find(l => l.code === lang)?.name}</span>
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end" className="rounded-2xl p-2 border-none shadow-2xl bg-white min-w-[140px]">
                {languages.map((l) => (
                  <DropdownMenuItem 
                    key={l.code} 
                    onClick={() => setLang(l.code as Language)}
                    className={`rounded-xl font-bold py-2 ${lang === l.code ? 'bg-primary text-white' : 'hover:bg-slate-50'}`}
                  >
                    {l.name}
                  </DropdownMenuItem>
                ))}
              </DropdownMenuContent>
            </DropdownMenu>

            <div className="flex bg-slate-100 rounded-full p-1 border shadow-inner">
              <button 
                onClick={() => setView('candidate')}
                className={`px-3 md:px-6 py-1.5 md:py-2 text-[9px] md:text-xs font-black uppercase tracking-widest rounded-full transition-all ${view === 'candidate' ? 'bg-primary text-white shadow-lg' : 'text-slate-500 hover:text-primary'}`}
              >
                {t.candidate}
              </button>
              <button 
                onClick={() => setView('recruiter')}
                className={`px-3 md:px-6 py-1.5 md:py-2 text-[9px] md:text-xs font-black uppercase tracking-widest rounded-full transition-all ${view === 'recruiter' ? 'bg-primary text-white shadow-lg' : 'text-slate-500 hover:text-primary'}`}
              >
                {t.recruiter}
              </button>
            </div>
          </div>
        </div>
      </nav>

      {/* --- CANDIDATE VIEW --- */}
      {view === 'candidate' && (
        <div className="pt-24 animate-in fade-in slide-in-from-bottom-4 duration-700">
          {/* Hero Section */}
          <section className="max-w-7xl mx-auto px-6 py-12 lg:py-20 flex flex-col lg:flex-row items-center">
            <div className="lg:w-1/2 space-y-8">
              <h2 className="text-4xl lg:text-7xl font-[1000] leading-tight text-slate-900 uppercase tracking-tighter">
                {t.heroTitle}
              </h2>
              
              <div className="flex flex-wrap gap-6">
                <div className="flex items-center gap-3">
                  <div className="bg-primary/10 p-2 rounded-lg text-primary">
                    <Globe size={24} />
                  </div>
                  <p className="text-sm font-medium text-slate-600">{t.heroDesc1}</p>
                </div>
                <div className="flex items-center gap-3">
                  <div className="bg-accent/10 p-2 rounded-lg text-accent">
                    <Search size={24} />
                  </div>
                  <p className="text-sm font-medium text-slate-600">{t.heroDesc2}</p>
                </div>
              </div>

              <div className="flex items-center gap-6 p-4 border border-slate-200 rounded-2xl w-fit">
                <div className="w-24 h-24 bg-slate-200 flex items-center justify-center rounded-lg">
                  <span className="text-[10px] text-center text-slate-500 font-black">{t.qrCode}</span>
                </div>
                <p className="text-sm text-slate-600 max-w-[200px] font-bold leading-tight">
                  {t.scanQr}
                </p>
              </div>
            </div>

            {/* Hero Illustration Area */}
            <div className="lg:w-1/2 mt-12 lg:mt-0 relative">
              <div className="relative z-10">
                 <img 
                  src="https://images.unsplash.com/photo-1539571696357-5a69c17a67c6?auto=format&fit=crop&q=80&w=600" 
                  alt="Candidate" 
                  className="rounded-[3rem] shadow-2xl"
                />
                {/* Floating Badges */}
                <div className="absolute -left-10 top-1/2 bg-white p-3 rounded-xl shadow-lg border border-orange-100 flex items-center gap-2 animate-bounce">
                  <div className="bg-orange-400 p-1 rounded-full text-white"><CheckCircle size={14}/></div>
                  <div>
                    <p className="text-[10px] font-bold text-orange-500 italic">Shortlisted</p>
                    <p className="text-[8px] text-slate-500 leading-tight">Your profile is shortlisted<br/>by a recruiter</p>
                  </div>
                </div>
                <div className="absolute -right-6 top-1/4 bg-white p-3 rounded-xl shadow-lg border border-green-100 flex items-center gap-2">
                  <div className="bg-green-500 p-1 rounded-full text-white"><CheckCircle size={14}/></div>
                  <div>
                    <p className="text-[10px] font-bold text-green-600 italic">Congrats!</p>
                    <p className="text-[8px] text-slate-500 leading-tight">Your application is sent<br/>successfully!</p>
                  </div>
                </div>
              </div>
            </div>
          </section>

          {/* Features Grid */}
          <section className="bg-slate-50 py-20 px-6">
            <div className="max-w-7xl mx-auto text-center mb-12">
              <h3 className="text-3xl font-black text-slate-900 uppercase tracking-tighter">{t.exploreTitle}</h3>
            </div>
            <div className="max-w-7xl mx-auto grid md:grid-cols-2 lg:grid-cols-4 gap-8">
              {[
                { title: t.feature1Title, desc: t.feature1Desc, icon: <CheckCircle className="text-primary"/> },
                { title: t.feature2Title, desc: t.feature2Desc, icon: <Globe className="text-accent"/> },
                { title: t.feature3Title, desc: t.feature3Desc, icon: <PhoneCall className="text-green-500"/> },
                { title: t.feature4Title, desc: t.feature4Desc, icon: <MapPin className="text-purple-500"/> },
              ].map((item, idx) => (
                <div key={idx} className="bg-white p-8 rounded-[2rem] shadow-sm hover:shadow-xl transition-all duration-500">
                  <div className="mb-4">{item.icon}</div>
                  <h4 className="font-black mb-2 text-slate-900 uppercase text-sm">{item.title}</h4>
                  <p className="text-xs text-slate-500 font-bold italic leading-relaxed">{item.desc}</p>
                </div>
              ))}
            </div>
          </section>

          {/* Dynamic Recent Openings Feed */}
          <section className="py-24 container mx-auto px-6 max-w-7xl">
            <div className="text-center mb-16 space-y-4">
              <h2 className="text-4xl md:text-5xl font-black text-slate-900 uppercase tracking-tighter">{t.recentOpenings}</h2>
              <div className="w-24 h-1.5 bg-accent mx-auto rounded-full" />
            </div>

            {isLoadingJobs ? (
              <div className="flex justify-center py-20">
                <div className="w-12 h-12 border-4 border-dashed rounded-full animate-spin border-primary"></div>
              </div>
            ) : recentJobs && recentJobs.length > 0 ? (
              <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
                {recentJobs.map((job) => (
                  <Card key={job.id} className="group rounded-[2.5rem] bg-white border-slate-100 shadow-xl hover:shadow-2xl transition-all duration-500 overflow-hidden flex flex-col border-2">
                    <CardHeader className="relative pt-8">
                      <div className="flex justify-between items-start mb-4">
                        <div className="relative w-12 h-12 bg-slate-50 rounded-xl border p-2 flex items-center justify-center overflow-hidden shadow-inner">
                          {job.logoUrl ? (
                            <Image src={job.logoUrl} alt={job.company} fill className="object-contain p-2" />
                          ) : (
                            <Building2 className="text-slate-300 h-6 w-6" />
                          )}
                        </div>
                        <Badge className="bg-primary/10 text-primary border-none font-black px-3 py-1 rounded-full uppercase text-[9px]">
                          {job.type}
                        </Badge>
                      </div>
                      <CardTitle className="text-xl font-black text-slate-900 uppercase leading-tight group-hover:text-primary transition-colors">
                        {job.title}
                      </CardTitle>
                      <p className="text-xs font-bold text-slate-400 flex items-center gap-2 mt-1">
                        <Building2 size={12} className="text-primary" /> {job.company}
                      </p>
                    </CardHeader>
                    <CardContent className="space-y-4 flex-1">
                      <div className="flex flex-wrap gap-3 text-[10px] font-black text-slate-400 uppercase tracking-widest">
                        <div className="flex items-center gap-1">
                          <MapPin size={12} className="text-accent" /> {job.location}
                        </div>
                        {job.salary && (
                          <div className="flex items-center gap-1">
                            <Briefcase size={12} className="text-primary" /> {job.salary}
                          </div>
                        )}
                      </div>
                      <p className="text-xs text-slate-500 font-bold line-clamp-2 italic leading-relaxed">
                        {job.description}
                      </p>
                      <Button onClick={() => setSelectedJob(job)} className="w-full h-12 rounded-2xl bg-slate-900 text-white font-black uppercase tracking-widest hover:bg-primary transition-all text-xs shadow-lg shadow-slate-200">
                        {t.viewDetails} <ChevronRight className="ml-1 h-4 w-4" />
                      </Button>
                    </CardContent>
                  </Card>
                ))}
              </div>
            ) : (
              <div className="text-center py-20 bg-slate-50 rounded-[3rem] border border-dashed border-slate-200">
                <p className="font-black text-slate-400 italic uppercase">{t.noJobs}</p>
              </div>
            )}
          </section>

          {/* Category Section */}
          <section className="py-20 px-6 max-w-7xl mx-auto grid md:grid-cols-2 gap-12 border-t border-slate-100">
            <div>
              <h3 className="text-2xl font-[1000] mb-6 italic underline decoration-primary underline-offset-8 uppercase tracking-tighter">{t.qualifications}</h3>
              <div className="flex flex-wrap gap-3">
                {['Bachelor Degree', 'Diploma', 'ITI', '12th Pass', '10th & Below'].map(q => (
                  <span key={q} className="px-4 py-2 bg-slate-100 rounded-full text-[10px] font-black uppercase tracking-widest text-slate-700">{q}</span>
                ))}
              </div>
            </div>
            <div>
              <h3 className="text-2xl font-[1000] mb-6 italic underline decoration-primary underline-offset-8 uppercase tracking-tighter">{t.jobTypes}</h3>
              <div className="flex flex-wrap gap-3">
                {['Full time', 'Part time', 'Contract', 'Temporary'].map(t => (
                  <span key={t} className="px-4 py-2 bg-accent/10 text-accent rounded-full text-[10px] font-black uppercase tracking-widest">{t}</span>
                ))}
              </div>
            </div>
          </section>
        </div>
      )}

      {/* --- RECRUITER VIEW --- */}
      {view === 'recruiter' && (
        <div className="pt-24 animate-in fade-in slide-in-from-bottom-4 duration-700">
          <section className="max-w-7xl mx-auto px-6 py-12 md:py-20 grid md:grid-cols-2 gap-12 items-center">
            <div className="space-y-8">
              <h1 className="text-4xl md:text-6xl font-[1000] leading-tight text-slate-900 uppercase tracking-tighter">
                {t.recruiterHeroTitle}
              </h1>
              <div className="flex flex-col sm:flex-row gap-6 mb-8">
                <div className="flex items-center gap-3">
                  <div className="bg-primary p-2 rounded-lg text-white shadow-md">
                    <Users size={20} />
                  </div>
                  <p className="text-sm font-bold text-slate-700">{t.recruiterHeroDesc1}</p>
                </div>
                <div className="flex items-center gap-3">
                  <div className="bg-accent p-2 rounded-lg text-white shadow-md">
                    <Zap size={20} />
                  </div>
                  <p className="text-sm font-bold text-slate-700">{t.recruiterHeroDesc2}</p>
                </div>
              </div>
              
              <div className="bg-white border rounded-[1.5rem] p-2 shadow-sm flex flex-col sm:flex-row gap-2 max-w-lg mb-4">
                <input 
                  type="tel" 
                  placeholder={t.enterMobile} 
                  className="flex-1 px-4 py-3 outline-none font-bold"
                />
                <Button asChild className="bg-primary text-white px-8 py-6 rounded-xl font-black uppercase tracking-widest hover:bg-slate-900 transition">
                  <Link href="/admin/login">{t.registerNow}</Link>
                </Button>
              </div>
              <div className="space-y-1">
                <Link href="/admin/login" className="text-primary font-black uppercase tracking-widest underline flex items-center gap-2 text-[10px]">
                  <Briefcase size={14} /> {t.enterpriseLogin}
                </Link>
                <p className="text-[10px] text-slate-400 font-bold italic">{t.liveOnlyTN}</p>
              </div>
            </div>

            {/* Hero Visuals */}
            <div className="relative flex justify-center items-center">
               <img 
                src="https://firebasestorage.googleapis.com/v0/b/studio-2309061503-7e9f2.firebasestorage.app/o/Jobportal%2Fimg-2.webp?alt=media&token=89560f30-8516-4925-9765-7eb711ca4161" 
                alt="Ayush Jobs Recruiter" 
                className="w-full h-auto max-w-xl object-contain drop-shadow-2xl"
              />
            </div>
          </section>

          {/* Hiring Partners */}
          <section className="bg-slate-50 py-10 border-y">
            <div className="max-w-7xl mx-auto px-6 text-center">
              <p className="text-xl font-black uppercase tracking-widest mb-8 italic text-slate-400">{t.hiringPartners}</p>
              <div className="flex flex-wrap justify-center gap-10 grayscale opacity-70">
                {['SHREEVARMA', 'AYUR.AI', 'NASYA', 'VIBHA', 'MINISTRY', 'PCR HERBALS'].map((brand) => (
                  <span key={brand} className="text-xl font-black text-slate-400 tracking-[0.2em]">{brand}</span>
                ))}
              </div>
            </div>
          </section>

          {/* Feature Highlights */}
          <section className="py-20 space-y-32">
            {/* Locality */}
            <div className="max-w-7xl mx-auto px-6 flex flex-col md:flex-row items-center gap-16">
              <div className="flex-1 order-2 md:order-1">
                 <div className="bg-primary/5 h-80 rounded-[3rem] flex items-center justify-center">
                    <Filter size={80} className="text-primary opacity-20" />
                 </div>
              </div>
              <div className="flex-1 order-1 md:order-2">
                <h2 className="text-4xl font-[1000] mb-4 text-slate-900 uppercase tracking-tighter">{t.hireLocTitle}</h2>
                <p className="text-slate-500 font-bold text-lg leading-relaxed italic">
                  {t.hireLocDesc}
                </p>
              </div>
            </div>

            {/* Direct Contact */}
            <div className="max-w-7xl mx-auto px-6 flex flex-col md:flex-row items-center gap-16">
              <div className="flex-1">
                <h2 className="text-4xl font-[1000] mb-4 text-slate-900 uppercase tracking-tighter">{t.directContactTitle}</h2>
                <p className="text-slate-500 font-bold text-lg leading-relaxed italic">
                  {t.directContactDesc}
                </p>
              </div>
              <div className="flex-1 bg-slate-900 rounded-[4rem] p-16 text-white flex justify-center gap-12 shadow-2xl relative overflow-hidden">
                <div className="absolute top-0 right-0 w-32 h-32 bg-primary/20 blur-3xl rounded-full" />
                <Phone size={80} className="text-primary" />
                <MessageSquare size={80} className="text-accent" />
              </div>
            </div>

            {/* Vernacular */}
            <div className="max-w-7xl mx-auto px-6 flex flex-col md:flex-row items-center gap-16">
              <div className="flex-1 order-2 md:order-1 flex justify-center">
                <div className="flex gap-4">
                  <div className="bg-white border-4 border-slate-50 shadow-xl px-10 py-6 rounded-2xl text-2xl font-black text-slate-900">English</div>
                  <div className="bg-white border-4 border-slate-50 shadow-xl px-10 py-6 rounded-2xl text-2xl font-black text-primary">தமிழ்</div>
                </div>
              </div>
              <div className="flex-1 order-1 md:order-2">
                <h2 className="text-4xl font-[1000] mb-4 text-slate-900 uppercase tracking-tighter">{t.vernacularTitle}</h2>
                <p className="text-slate-500 font-bold text-lg leading-relaxed italic">
                  {t.vernacularDesc}
                </p>
              </div>
            </div>
          </section>

          {/* Benefit Cards */}
          <section className="bg-slate-50 py-24">
            <div className="max-w-7xl mx-auto px-6">
              <h2 className="text-3xl md:text-5xl font-[1000] text-center mb-16 text-slate-900 uppercase tracking-tighter">
                {t.benefitHeading}
              </h2>
              <div className="grid md:grid-cols-3 gap-8">
                {[
                  { title: t.benefit1Title, desc: t.benefit1Desc },
                  { title: t.benefit2Title, desc: t.benefit2Desc },
                  { title: t.benefit3Title, desc: t.benefit3Desc }
                ].map((benefit, i) => (
                  <div key={i} className="bg-white p-10 rounded-[2.5rem] border hover:shadow-2xl transition-all duration-500 group">
                    <div className="bg-primary/10 w-14 h-14 rounded-2xl flex items-center justify-center text-primary mb-8 group-hover:bg-primary group-hover:text-white transition-colors">
                      <BarChart3 size={28} />
                    </div>
                    <h3 className="text-xl font-black mb-4 text-slate-900 uppercase leading-tight">{benefit.title}</h3>
                    <p className="text-slate-500 font-bold text-sm leading-relaxed italic">{benefit.desc}</p>
                  </div>
                ))}
              </div>
            </div>
          </section>

          {/* Roles & Location Cloud */}
          <section className="py-24 bg-slate-900 text-white rounded-[4rem] mx-6 mb-24 overflow-hidden relative">
            <div className="absolute top-0 right-0 w-96 h-96 bg-primary/10 blur-[100px] rounded-full" />
            <div className="max-w-7xl mx-auto px-10 relative z-10">
              <div className="mb-20">
                <h2 className="text-3xl md:text-5xl font-black mb-8 uppercase tracking-tighter">{t.rolesTitle}</h2>
                <div className="flex flex-wrap gap-3">
                  {roles.map(role => (
                    <span key={role} className="bg-white/10 px-6 py-3 rounded-full border border-white/20 text-xs font-black uppercase tracking-widest hover:bg-white hover:text-slate-900 transition cursor-default">
                      {role}
                    </span>
                  ))}
                </div>
                <Button asChild className="mt-12 bg-white text-slate-900 px-10 py-8 rounded-2xl font-black text-lg hover:bg-primary hover:text-white transition shadow-2xl shadow-white/5">
                    <Link href="/admin/login">{t.registerForFree}</Link>
                </Button>
              </div>

              <div>
                <h2 className="text-3xl md:text-5xl font-black mb-4 uppercase tracking-tighter">{t.localityTitle}</h2>
                <p className="text-slate-400 mb-10 max-w-2xl font-bold text-lg italic">
                  {t.localityDesc}
                </p>
                <div className="flex flex-wrap gap-x-10 gap-y-6">
                  {locations.map(loc => (
                    <span key={loc} className="text-xl font-black border-b-2 border-white/20 hover:border-white transition cursor-pointer uppercase tracking-[0.2em] pb-1">
                      {loc}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          </section>

          {/* FAQ Section */}
          <section className="py-20 max-w-4xl mx-auto px-6">
            <h2 className="text-4xl font-[1000] text-center mb-16 text-slate-900 uppercase tracking-tighter">{t.faqs}</h2>
            <div className="space-y-4">
              {faqs.map((faq, idx) => (
                <div key={idx} className="border-b border-slate-100 last:border-0">
                  <button 
                    onClick={() => setOpenFaq(openFaq === idx ? null : idx)}
                    className="w-full flex items-center justify-between py-8 text-left font-black text-xl uppercase tracking-tight hover:text-primary transition group"
                  >
                    <span className="flex-1 pr-8">{faq}</span>
                    <div className={`shrink-0 w-8 h-8 rounded-full border-2 flex items-center justify-center transition-all ${openFaq === idx ? 'bg-primary border-primary text-white rotate-180' : 'border-slate-200 text-slate-400 group-hover:border-primary'}`}>
                      <ChevronDown size={20} />
                    </div>
                  </button>
                  {openFaq === idx && (
                    <div className="pb-8 text-slate-500 font-bold text-lg leading-relaxed italic animate-in slide-in-from-top-2 duration-300">
                      {t.faqAns}
                    </div>
                  )}
                </div>
              ))}
            </div>
          </section>

          {/* Final CTA */}
          <section className="py-32 bg-primary/5 text-center border-t border-slate-100">
            <div className="max-w-4xl mx-auto px-6">
              <p className="text-primary font-black uppercase tracking-[0.3em] mb-6 text-sm">Ayush Jobs Network</p>
              <h2 className="text-4xl md:text-7xl font-[1000] mb-8 text-slate-900 uppercase tracking-tighter leading-none">{t.finalCtaTitle}</h2>
              <p className="text-slate-500 font-bold text-xl mb-12 italic">{t.finalCtaDesc}</p>
              <Button asChild className="bg-primary text-white px-16 py-10 rounded-[2rem] font-black text-2xl hover:bg-slate-900 shadow-2xl shadow-primary/20 transform hover:-translate-y-1 transition duration-500 uppercase tracking-widest">
                <Link href="/admin/login">{t.registerForFree}</Link>
              </Button>
            </div>
          </section>
        </div>
      )}

      {/* --- JOB DETAILS DIALOG --- */}
      <Dialog open={!!selectedJob} onOpenChange={(open) => !open && setSelectedJob(null)}>
        <DialogContent className="max-w-4xl h-[90vh] flex flex-col p-0 border-none rounded-[3rem] overflow-hidden shadow-2xl z-[60]">
          {selectedJob && (
            <>
              <div className="relative h-40 md:h-56 shrink-0">
                {selectedJob.bannerUrl ? (
                  <Image src={selectedJob.bannerUrl} alt="Banner" fill className="object-cover" />
                ) : (
                  <div className="absolute inset-0 bg-gradient-to-r from-primary/80 to-accent/80" />
                )}
                <div className="absolute inset-0 bg-black/20" />
                
                <div className="absolute -bottom-8 left-8">
                  <div className="relative w-24 h-24 md:w-32 md:h-32 bg-white rounded-3xl p-4 shadow-2xl border-4 border-white flex items-center justify-center overflow-hidden">
                    {selectedJob.logoUrl ? (
                      <Image src={selectedJob.logoUrl} alt={selectedJob.company} fill className="object-contain p-4" />
                    ) : (
                      <Building2 className="text-slate-200 h-12 w-12" />
                    )}
                  </div>
                </div>
              </div>

              <div className="flex-1 min-h-0 pt-12">
                <ScrollArea className="h-full">
                  <div className="p-8 md:p-12 space-y-8">
                    <div className="space-y-2">
                      <DialogHeader className="p-0 text-left">
                        <DialogTitle className="text-3xl md:text-4xl font-black text-slate-900 uppercase tracking-tight leading-none">
                          {selectedJob.title}
                        </DialogTitle>
                        <DialogDescription className="text-primary font-black text-lg flex items-center gap-2 italic">
                          <Building2 size={18} /> {selectedJob.company}
                        </DialogDescription>
                      </DialogHeader>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                      <div className="flex items-center gap-3 p-4 rounded-2xl bg-slate-50 border border-slate-100">
                        <div className="bg-primary/10 p-2 rounded-lg text-primary"><MapPin size={18} /></div>
                        <div className="flex flex-col">
                          <span className="text-[10px] font-black uppercase text-slate-400 leading-none mb-1">{t.location}</span>
                          <span className="text-sm font-black text-slate-700">{selectedJob.location}</span>
                        </div>
                      </div>
                      <div className="flex items-center gap-3 p-4 rounded-2xl bg-slate-50 border border-slate-100">
                        <div className="bg-accent/10 p-2 rounded-lg text-accent"><Briefcase size={18} /></div>
                        <div className="flex flex-col">
                          <span className="text-[10px] font-black uppercase text-slate-400 leading-none mb-1">{t.salary}</span>
                          <span className="text-sm font-black text-slate-700">{selectedJob.salary || 'Competitive'}</span>
                        </div>
                      </div>
                      <div className="flex items-center gap-3 p-4 rounded-2xl bg-slate-50 border border-slate-100">
                        <div className="bg-blue-50 p-2 rounded-lg text-blue-500"><Zap size={18} /></div>
                        <div className="flex flex-col">
                          <span className="text-[10px] font-black uppercase text-slate-400 leading-none mb-1">{t.jobType}</span>
                          <span className="text-sm font-black text-slate-700">{selectedJob.type}</span>
                        </div>
                      </div>
                    </div>

                    <div className="space-y-8">
                      <div className="space-y-4">
                        <h4 className="text-xs font-black uppercase tracking-[0.2em] text-slate-400 flex items-center gap-2">
                          <div className="w-8 h-px bg-slate-200" /> {t.jobDescription}
                        </h4>
                        <div className="p-8 rounded-[2.5rem] bg-white border-2 border-slate-50 text-slate-600 leading-relaxed text-sm font-bold italic whitespace-pre-wrap">
                          {selectedJob.description}
                        </div>
                      </div>

                      {selectedJob.requirements && (
                        <div className="space-y-4">
                          <h4 className="text-xs font-black uppercase tracking-[0.2em] text-slate-400 flex items-center gap-2">
                            <div className="w-8 h-px bg-slate-200" /> {t.requirements}
                          </h4>
                          <div className="p-8 rounded-[2.5rem] bg-primary/5 border-2 border-primary/10 text-slate-700 leading-relaxed text-sm font-black whitespace-pre-wrap">
                            {selectedJob.requirements}
                          </div>
                        </div>
                      )}
                    </div>
                  </div>
                </ScrollArea>
              </div>

              <DialogFooter className="p-6 md:p-8 bg-white border-t border-slate-100 shrink-0 gap-4 flex-row items-center justify-between">
                <Button variant="ghost" onClick={() => setSelectedJob(null)} className="h-14 px-8 rounded-2xl font-black uppercase text-slate-400 hover:text-slate-600 text-[10px]">
                  {t.close}
                </Button>
                <Button asChild className="flex-1 h-14 bg-primary text-white font-black uppercase tracking-widest rounded-2xl hover:bg-slate-900 transition-all shadow-xl shadow-primary/20">
                  <Link href={`/jobs/profile`}>{t.confirmApply}</Link>
                </Button>
              </DialogFooter>
            </>
          )}
        </DialogContent>
      </Dialog>
    </main>
  );
}

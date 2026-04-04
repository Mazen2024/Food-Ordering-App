import { prismaObj } from "./lib/prisma";

const Cat = [
  {
    "id": "r6jf0008wweiw4fgxtjn",
    "nameAR": "بيتزا كلاسيك",
    "nameEN": "Classic Pizzas",
    "order": 9
  },
  {
    "id": "cmmclr7cb000bwweizjqmmik4",
    "nameAR": "بيتزا مودرن",
    "nameEN": "Modern Pizzas",
    "order": 12
  },
  {
    "id": "cmmcmgtlh0000koei0w6b1b4a",
    "nameAR": "تنويعات إقليمية/عالمية مميّزة",
    "nameEN": "Unique Regional/Global Variations",
    "order": 13
  }
]

/************************************************************************************* */

const pro = [
  {
    "id": "cmmcmmmt100003geic39qmmt0",
    "basePrice": 160.12,
    "categoriesId": "cmmcmgtlh0000koei0w6b1b4a",
    "createdAt": "2026-03-04T20:47:01.514Z",
    "descriptionAR": "مزيج هندي-إيطالي يجمع بين جبن البانير المتبّل، وصلصة حارة، وخضروات متنوعة.",
    "descriptionEN": "Indian-Italian fusion with marinated paneer, spicy sauce, and veggies.",
    "image": "/assets/images/Pro5.jpg",
    "nameAR": "بيتزا بانير تيكا",
    "nameEN": "Paneer Tikka Pizza",
    "order": 11,
    "updatedAt": "2026-03-04T20:47:01.514Z"
  },
  {
    "id": "cmmcm0qie0000m4eihbuwdftt",
    "basePrice": 120.36,
    "categoriesId": "cmmclr6jf0008wweiw4fgxtjn",
    "createdAt": "2026-03-04T20:30:00.348Z",
    "descriptionAR": "البيتزا الكلاسيكية المطهوة في فرن يعمل بالحطب، بعجينة رقيقة وطرية وهشّة، وتُزيَّن تقليديًا بصلصة الطماطم وجبن الموزاريلا والريحان.",
    "descriptionEN": "The classic, wood-fired pizza with a thin, soft, and airy crust, traditionally topped with tomato sauce, mozzarella, and basil.",
    "image": "/assets/images/Pro1.jpg",
    "nameAR": "نيوبوليتان",
    "nameEN": "Neapolitan",
    "order": 1,
    "updatedAt": "2026-03-04T20:30:00.348Z"
  },
  {
    "id": "cmmcm0qif0001m4eieaannl98",
    "basePrice": 180.88,
    "categoriesId": "cmmclr6jf0008wweiw4fgxtjn",
    "createdAt": "2026-03-04T20:30:00.348Z",
    "descriptionAR": "شرائح كبيرة قابلة للطي، بعجينة مقرمشة ولكن مرنة في الوقت نفسه، وغالبًا ما تُحضَّر بصلصة أساسها الطماطم وجبن الموزاريلا.",
    "descriptionEN": "Large, foldable slices with a crisp-yet-pliable crust, often featuring a tomato-based sauce and mozzarella.",
    "image": "/assets/images/Pro2.jpg",
    "nameAR": "نيو يورك استايل",
    "nameEN": "New York-Style",
    "order": 2,
    "updatedAt": "2026-03-04T20:30:00.348Z"
  },
  {
    "id": "cmmcmbb0y00005geismk83vyv",
    "basePrice": 750.98,
    "categoriesId": "cmmclr7cb000bwweizjqmmik4",
    "createdAt": "2026-03-04T20:38:13.452Z",
    "descriptionAR": "بيتزا بعجينة سميكة تشبه الطاجن، تُخبَز في صينية عميقة، حيث يُوضَع الجبن في الأسفل، ثم الإضافات في الوسط، وتعلوها الصلصة من الأعلى.",
    "descriptionEN": "A thick-crust, casserole-like pizza baked in a deep pan, with cheese at the bottom, toppings in the middle, and sauce on top.",
    "image": "/assets/images/Pro3.png",
    "nameAR": "بيتزا شيكاغو العميقة.",
    "nameEN": "Chicago Deep-Dish",
    "order": 5,
    "updatedAt": "2026-03-04T20:38:13.452Z"
  },
  {
    "id": "cmmcmmmt200013geij4822m8m",
    "basePrice": 500,
    "categoriesId": "cmmcmgtlh0000koei0w6b1b4a",
    "createdAt": "2026-03-04T20:47:01.514Z",
    "descriptionAR": "عجينة رقيقة جدًا ومقرمشة، مع القشدة الحامضة، والبصل، واللحم المقدد.",
    "descriptionEN": "A very thin, crisp dough with sour cream, onions, and bacon.",
    "image": "/assets/images/Pro6.png",
    "nameAR": "فلامكوشن (الألزاس)",
    "nameEN": "Flammkuchen (Alsace)",
    "order": 12,
    "updatedAt": "2026-03-04T20:47:01.514Z"
  },
  {
    "id": "cmmcmbb0z00015geilr3wi5mp",
    "basePrice": 230,
    "categoriesId": "cmmclr6jf0008wweiw4fgxtjn",
    "createdAt": "2026-03-04T20:38:13.452Z",
    "descriptionAR": "عجينة سميكة مستطيلة وهشّة، تتميّز بحواف من الجبن المُكرمل، وتُغطّى بجبن بريك وصلصة الطماطم.",
    "descriptionEN": "Large, foldable slices with a crisp-yet-pliable crust, often featuring a tomato-based sauce and mozzarella.",
    "image": "/assets/images/Pro4.png",
    "nameAR": "بيتزا على طريقة ديترويت.",
    "nameEN": "Detroit Style",
    "order": 6,
    "updatedAt": "2026-03-04T20:38:13.452Z"
  },
  {
    "id": "cmmiiuhdm0001a4eidbe6zx1g",
    "basePrice": 522,
    "categoriesId": "cmmcmgtlh0000koei0w6b1b4a",
    "createdAt": "2026-03-08T23:47:46.865Z",
    "descriptionAR": "بيتزا مستطيلة الشكل تُخبز في صواني كبيرة، وغالبًا ما تُباع بالوزن.",
    "descriptionEN": "Rectangular pizza baked in large pans, often sold by weight.",
    "image": "/assets/images/Pro7.jpg",
    "nameAR": "بيتزا رومانية (بيتزا آل تاجليو)",
    "nameEN": "Roman Pizza (Pizza al Taglio)",
    "order": 18,
    "updatedAt": "2026-03-08T23:47:46.865Z"
  },
  {
    "id": "cmmiiuhdm0002a4eivni2zcsg",
    "basePrice": 425.88,
    "categoriesId": "cmmclr7cb000bwweizjqmmik4",
    "createdAt": "2026-03-08T23:47:46.865Z",
    "descriptionAR": "عجينة سميكة تشبه عجينة الفوكاشيا، إسفنجية وخفيفة، وغالبًا ما تُغطى بصلصة الطماطم والبصل والأنشوجة والأعشاب.",
    "descriptionEN": "A thick, focaccia-like crust that is spongy and airy, often topped with tomato sauce, onions, anchovies, and herbs.",
    "image": "/assets/images/Pro8.jpg",
    "nameAR": "صقلية (سفينسيوني)",
    "nameEN": "Sicilian (Sfincione)",
    "order": 19,
    "updatedAt": "2026-03-08T23:47:46.865Z"
  },
  {
    "id": "cmmiiuhdk0000a4eid8xeu2mg",
    "basePrice": 256.12,
    "categoriesId": "cmmclr7cb000bwweizjqmmik4",
    "createdAt": "2026-03-08T23:47:46.865Z",
    "descriptionAR": "مُحمّلة بالخضراوات مثل البصل والفلفل والفطر والزيتون.",
    "descriptionEN": "Loaded with vegetables like onions, peppers, mushrooms, and olives.",
    "image": "/assets/images/Pro9.jpg",
    "nameAR": "نباتي",
    "nameEN": "Veggie",
    "order": 17,
    "updatedAt": "2026-03-08T23:47:46.865Z"
  }
]


/************************************************************************************* */


  const names = await prismaObj.sizes.createMany({
    data: [
      { id: "cmmf6mp7w000laoeihoftsay6", name: "SMALL", price: 10, productsId: "cmmcmmmt100003geic39qmmt0" },
      { id: "cmmf6mp7w000maoeiskn7wc8i", name: "MEDIUM", price: 20, productsId: "cmmcmmmt100003geic39qmmt0" },
      { id: "cmmf6mp7w000naoeigd0knxwy", name: "LARGE", price: 50, productsId: "cmmcmmmt100003geic39qmmt0" },

      { id: "cmmg4blzq0000e0eih41yphcr", name: "SMALL", price: 100, productsId: "cmmcm0qif0001m4eieaannl98" },
      { id: "cmmg4blzr0001e0eik60dxbkh", name: "MEDIUM", price: 200, productsId: "cmmcm0qif0001m4eieaannl98" },
      { id: "cmmg4blzr0002e0eiltjkgjz0", name: "LARGE", price: 300, productsId: "cmmcm0qif0001m4eieaannl98" },

      { id: "cmmg4qdk40009e0eigr2iumoe", name: "SMALL", price: 12, productsId: "cmmcm0qie0000m4eihbuwdftt" },
      { id: "cmmg4qdk6000ae0eiw41cedhu", name: "MEDIUM", price: 22.36, productsId: "cmmcm0qie0000m4eihbuwdftt" },
      { id: "cmmg4qdk6000be0eiqta4taws", name: "LARGE", price: 33.18, productsId: "cmmcm0qie0000m4eihbuwdftt" },

      { id: "cmmg4skxo000fe0ei5029tkw7", name: "SMALL", price: 50, productsId: "cmmcmmmt200013geij4822m8m" },
      { id: "cmmg4skxp000ge0ei7a2ga9nt", name: "MEDIUM", price: 60.23, productsId: "cmmcmmmt200013geij4822m8m" },
      { id: "cmmg4skxp000he0ei66hn273o", name: "LARGE", price: 70.89, productsId: "cmmcmmmt200013geij4822m8m" },

      { id: "cmmg4v6zm000le0eimjazhyrr", name: "SMALL", price: 50, productsId: "cmmcmbb0y00005geismk83vyv" },
      { id: "cmmg4v6zn000me0eimu69zire", name: "MEDIUM", price: 60.23, productsId: "cmmcmbb0y00005geismk83vyv" },
      { id: "cmmg4v6zn000ne0ei7js7z1gb", name: "LARGE", price: 70.89, productsId: "cmmcmbb0y00005geismk83vyv" },

      { id: "cmmg51x9z000ue0eigd7yw7h1", name: "SMALL", price: 30, productsId: "cmmcmbb0z00015geilr3wi5mp" },
      { id: "cmmg51xa1000ve0eiu4ckp12o", name: "MEDIUM", price: 40, productsId: "cmmcmbb0z00015geilr3wi5mp" },
      { id: "cmmg51xa1000we0ei8jfmhitx", name: "LARGE", price: 50, productsId: "cmmcmbb0z00015geilr3wi5mp" },

      { id: "cmmimo02n001e7ceit04uoxr8", name: "SMALL", price: 50, productsId: "cmmiiuhdk0000a4eid8xeu2mg" },
      { id: "cmmimo02p001f7ceise644fd7", name: "MEDIUM", price: 100, productsId: "cmmiiuhdk0000a4eid8xeu2mg" },
      { id: "cmmimo02p001g7ceihqq4ww09", name: "LARGE", price: 150, productsId: "cmmiiuhdk0000a4eid8xeu2mg" },
      { id: "cmmimo02q001h7ceilnlia6gk", name: "EXTRA_LARGE", price: 200, productsId: "cmmiiuhdk0000a4eid8xeu2mg" },

      { id: "cmmimr1gf001i7ceilnm3xq55", name: "SMALL", price: 50, productsId: "cmmiiuhdm0002a4eivni2zcsg" },
      { id: "cmmimr1gg001j7ceimio36y4p", name: "MEDIUM", price: 100, productsId: "cmmiiuhdm0002a4eivni2zcsg" },
      { id: "cmmimr1gh001k7ceinu4a12od", name: "LARGE", price: 150, productsId: "cmmiiuhdm0002a4eivni2zcsg" },


      { id: "cmmimr1gh001l7ceioramvqn3", name: "EXTRA_LARGE", price: 200, productsId: "cmmiiuhdm0002a4eivni2zcsg" },
      { id: "cmmims3l1001m7ceidtf2twbz", name: "SMALL", price: 50, productsId: "cmmiiuhdm0001a4eidbe6zx1g" },
      { id: "cmmims3l2001n7ceimmf8rm5v", name: "MEDIUM", price: 100, productsId: "cmmiiuhdm0001a4eidbe6zx1g" },


      { id: "cmmims3l3001p7ceienrymm1g", name: "LARGE", price: 150, productsId: "cmmiiuhdm0001a4eidbe6zx1g" },
      { id: "cmmims3l3001p7ceienryus1g", name: "EXTRA_LARGE", price: 200, productsId: "cmmiiuhdm0001a4eidbe6zx1g" }
    ],
    skipDuplicates: true
  });




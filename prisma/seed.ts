import { faker } from "@faker-js/faker";
import { prisma } from "@/lib/prisma";

async function main() {
  // List of Cloudinary public IDs
  const cloudinaryPublicIds = [
    "udhdxkoffz4tlhtjlx2k",
    "jfin1jnrflq6fwrih2bb",
    "u6x9ugt7dczjt2itsadc",
    "bexervhibvtlooutiqfk",
    "has37ophskimj4nbn8ah",
    "vtbxnha47x6w9lpbdaqk",
    "iaoqcmcoafmgwxddkzm8",
    "ykbo2gkhzvvkexssmimx",
    "gflo7wwvhmilamfimxnf",
    "vrrzzntlegui6fpm5dyg",
    "zftud3cg1c6nineglpcd",
    "cya8ojdia7gnjtghjykv",
    "ywht0wbtt9pudcgnt2uu",
    "lhmew0xcj9glcixctvst",
    "xpxottrkwmqvw1dybnpi",
    "qqoorkri3x42tiobvim0",
    "ohsqvwpto6dj9mna1gwc",
    "z0lkf9cwjkxze0alsqq0",
    "daeoqs8jy6qwzv1aikr7",
    "h1xeg78jezuggankwdv1",
    "ucccqo3bpewtvbyq5ytg",
    "s9hzklakc71jjbbctjtr",
    "e4u2yvlkqwbdsb28xq1z",
    "rb07fu5visdnlsr1htcx",
    "r5yzvphgwc9jwrwlk6hx",
    "p7fkxxjqrogwe6pd6vik",
    "g5coubfjdeprs2zxprij",
  ];

  // Seed Categories
  const categoryNames = [
    "Shoes",
    "Clothing",
    "Accessories",
    "Electronics",
    "Books",
  ];
  for (const name of categoryNames) {
    await prisma.category.create({
      data: {
        name,
        description: faker.lorem.sentence(),
        image: faker.helpers.arrayElement(cloudinaryPublicIds), // Store public ID only
      },
    });
  }
  console.log(`Seeded ${categoryNames.length} categories`);

  // Seed Products
  const categories = await prisma.category.findMany();
  for (let i = 0; i < 50; i++) {
    const category = faker.helpers.arrayElement(categories);
    const numImages = faker.datatype.boolean() ? 2 : 1;
    const images = Array.from({ length: numImages }, () =>
      faker.helpers.arrayElement(cloudinaryPublicIds)
    );

    await prisma.product.create({
      data: {
        name: faker.commerce.productName(),
        description: faker.lorem.paragraph(),
        price: parseFloat(faker.commerce.price({ min: 10, max: 500 })),
        discountedPrice: parseFloat(faker.commerce.price({ min: 5, max: 400 })),
        categoryId: category.id,
        images,
        color: [
          faker.helpers.arrayElement([
            "Red",
            "Blue",
            "Green",
            "Black",
            "White",
          ]),
        ],
        size: [faker.helpers.arrayElement(["S", "M", "L", "XL"])],
      },
    });
  }
  console.log(`Seeded 50 products`);
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });

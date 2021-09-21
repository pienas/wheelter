import db from "./index"

const seed = async () => {
  const carServiceUser = await db.carServiceUser.create({
    data: {
      name: "Serviso",
      surname: "Savininkas",
      email: "savininkas@wheelter.lt",
      phone: "37065555555",
    },
  })
  const client = await db.user.create({
    data: {
      name: "Pirmas",
      surname: "Klientas",
      email: "klientas@wheelter.lt",
      phone: "37065555555",
    },
  })
  const carService = await db.carService.create({
    data: {
      plan: "STANDARD",
      url: "wheelter",
      name: "Wheelter",
      email: "wheelter@wheelter.lt",
      phone: "37065555555",
      isActive: true,
      isReviewed: true,
      avatarUrl:
        "https://res.cloudinary.com/wheelter50e8aa/image/upload/v1631816509/avatars/carServices/1.png",
    },
  })
  await db.carServiceUserRelation.create({
    data: {
      userRole: "Savininkas",
      completedOrders: 0,
      user: {
        connect: {
          id: carServiceUser.id,
        },
      },
      carService: {
        connect: {
          id: carService.id,
        },
      },
    },
  })
  for (let i = 0; i < 10; i++) {
    await db.notification.create({
      data: {
        type: "NEW",
        title: `Notification ${i + 1}`,
        content: `${i + 1}`,
        carServiceUser: {
          connect: {
            id: carServiceUser.id,
          },
        },
      },
    })
  }
  await db.employee.create({
    data: {
      name: "Serviso",
      surname: "Savininkas",
      position: "Savininkas",
      completedOrders: 0,
      carService: {
        connect: {
          id: carService.id,
        },
      },
    },
  })
  const employee = await db.employee.create({
    data: {
      name: "Pirmas",
      surname: "Darbuotojas",
      position: "Mechanikas",
      completedOrders: 10,
      carService: {
        connect: {
          id: carService.id,
        },
      },
    },
  })
  const service = await db.service.create({
    data: {
      name: "Ratų balansavimas",
      price: 40,
      duration: 40,
    },
  })
  const today = new Date()
  const tomorrow = new Date(today)
  const status = ["NEW", "DONE", "CANCELLED"]
  for (let i = 0; i < 10; i++) {
    tomorrow.setHours(tomorrow.getHours() + 1 + i)
    const review = await db.review.create({
      data: {
        rating: Math.floor(Math.random() * (5 - 1 + 1) + 1),
        isReviewed: true,
        author: {
          connect: {
            id: client.id,
          },
        },
        carService: {
          connect: {
            id: carService.id,
          },
        },
      },
    })
    await db.order.create({
      data: {
        startsAt: tomorrow,
        price: 40,
        status: status[Math.floor(Math.random() * status.length)],
        carService: {
          connect: {
            id: carService.id,
          },
        },
        employee: {
          connect: {
            id: employee.id,
          },
        },
        service: {
          connect: {
            id: service.id,
          },
        },
        client: {
          connect: {
            id: client.id,
          },
        },
        review: {
          connect: {
            id: review.id,
          },
        },
      },
    })
  }
  await db.address.create({
    data: {
      city: "Klaipėda",
      street: "Malūnininkų g.",
      house: "3",
      coordinateX: 21.11489019845214,
      coordinateY: 55.72109674021472,
      carService: {
        connect: {
          id: carService.id,
        },
      },
    },
  })
}

export default seed

import { hash } from "@node-rs/argon2";
import { prisma } from "@/lib/prisma";

const users = [
  { username: "admin", email: "admin@admin.com" },
  { username: "user", email: "francisko.rezende@gmail.com" },
];

const tickets = [
  {
    title: "Ticket 1",
    content: "This is the first ticket from the database.",
    status: "DONE" as const,
    bounty: 499,
    deadline: new Date().toISOString().split("T")[0],
  },
  {
    title: "Ticket 2",
    content: "This is the second ticket from the database.",
    status: "OPEN" as const,
    bounty: 599,
    deadline: new Date().toISOString().split("T")[0],
  },
  {
    title: "Ticket 3",
    content: "This is the third ticket from the database.",
    status: "IN_PROGRESS" as const,
    bounty: 699,
    deadline: new Date().toISOString().split("T")[0],
  },
];

const comments = [
  { content: "First comment from the db" },
  { content: "Second comment from the db" },
  { content: "Third comment from the db" },
];

const seed = async () => {
  try {
    const t0 = performance.now();
    console.log("DB seed started...");

    await prisma.comment.deleteMany();
    await prisma.ticket.deleteMany();
    await prisma.user.deleteMany();

    const passwordHash = await hash("segredo");

    const dbUsers = await prisma.user.createManyAndReturn({
      data: users.map((user) => ({ ...user, passwordHash })),
    });

    const dbTickets = await prisma.ticket.createManyAndReturn({
      data: tickets.map((ticket) => ({ ...ticket, userId: dbUsers[0].id })),
    });

    await prisma.comment.createMany({
      data: comments.map((comment) => ({
        ...comment,
        ticketId: dbTickets[0].id,
        userId: dbUsers[1].id,
      })),
    });

    const t1 = performance.now();
    console.log(`DB seed finished (took ${t1 - t0} ms)`);
  } catch (error) {
    console.error(error);
  }
};

seed();

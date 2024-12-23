import prisma from '../libs/prisma';

export const fetchActorsWithFilmCount = async () => {
  return prisma.actor.findMany({
    select: {
      actor_id: true,
      first_name: true,
      last_name: true,
      _count: {
        select: {
          film_actor: true, // Counts the number of films associated with the actor
        },
      },
    },
  });
};

export const searchActors = async (searchTerm: string) => {
  return prisma.actor.findMany({
    where: {
      OR: [
        {
          first_name: {
            contains: searchTerm, // Partial match for first_name
            mode: 'insensitive', // Case-insensitive search
          },
        },
        {
          last_name: {
            contains: searchTerm, // Partial match for last_name
            mode: 'insensitive', // Case-insensitive search
          },
        },
      ],
    },
  });
};

import prismaMock from './mocks/prismaMock'; // mock needs to be imported at top for hoisting reasons
import { describe, test, vi, expect, beforeEach } from 'vitest';
import { fetchActorsWithFilmCount } from '../src/queries/actors.queries';

// Use vitest to mock the prisma import
vi.mock('../src/libs/prisma', async () => ({
  default: prismaMock,
}));

describe('fetchActorsWithFilmCount', () => {
  beforeEach(() => {
    // Clear mocks before each test
    vi.clearAllMocks();
  });

  test('should return a list of actors with film count', async () => {
    const mockedActors = [
      {
        actor_id: 1,
        first_name: 'John',
        last_name: 'Doe',
        last_update: new Date(),
        _count: { film_actor: 3 },
      },
      {
        actor_id: 2,
        first_name: 'Jane',
        last_name: 'Smith',
        last_update: new Date(),
        _count: { film_actor: 5 },
      },
    ];

    // Define what the mocked findMany should return
    prismaMock.actor.findMany.mockResolvedValueOnce(mockedActors);

    const result = await fetchActorsWithFilmCount();

    // Ensure that findMany was called with the correct arguments
    expect(prismaMock.actor.findMany).toHaveBeenCalledWith({
      select: {
        actor_id: true,
        first_name: true,
        last_name: true,
        _count: {
          select: {
            film_actor: true,
          },
        },
      },
    });

    // Ensure that the result matches the mock data
    expect(result).toEqual(mockedActors);
  });
});

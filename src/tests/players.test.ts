import { Request, Response } from 'express';
import controllers from '../controllers/players';
import { Player } from '../models/player';


describe('GET /players', () => {
  let mockRequest: Partial<Request>;
  let mockResponse: Partial<Response>;
  let mockJson: jest.Mock;

  beforeEach(() => {
    mockRequest = {};
    mockJson = jest.fn();
    mockResponse = {
      status: jest.fn().mockReturnThis(),
      json: mockJson,
    };
  });

  it('should return all players sorted by rank in descending order', () => {
    const mockPlayers: Player[] = [
        
            {
                id: 95,
                firstname: 'Venus',
                lastname: 'Williams',
                shortname: 'V.WIL',
                sex: 'F',
                country: {
                    picture: 'https://data.latelier.co/training/tennis_stats/resources/USA.png',
                    "code": "USA"
                },
                "picture": "https://data.latelier.co/training/tennis_stats/resources/Venus.webp",
                "data": {
                    "rank": 52,
                    "points": 1105,
                    "weight": 74000,
                    "height": 185,
                    "age": 38,
                    "last": [
                        0,
                        1,
                        0,
                        0,
                        1
                    ]
                }
            },
            {
                "id": 65,
                "firstname": "Stan",
                "lastname": "Wawrinka",
                "shortname": "S.WAW",
                "sex": "M",
                "country": {
                    "picture": "https://data.latelier.co/training/tennis_stats/resources/Suisse.png",
                    "code": "SUI"
                },
                "picture": "https://data.latelier.co/training/tennis_stats/resources/Wawrinka.png",
                "data": {
                    "rank": 21,
                    "points": 1784,
                    "weight": 81000,
                    "height": 183,
                    "age": 33,
                    "last": [
                        1,
                        1,
                        1,
                        0,
                        1
                    ]
                }
            },
            {
                "id": 102,
                "firstname": "Serena",
                "lastname": "Williams",
                "shortname": "S.WIL",
                "sex": "F",
                "country": {
                    "picture": "https://data.latelier.co/training/tennis_stats/resources/USA.png",
                    "code": "USA"
                },
                "picture": "https://data.latelier.co/training/tennis_stats/resources/Serena.png",
                "data": {
                    "rank": 10,
                    "points": 3521,
                    "weight": 72000,
                    "height": 175,
                    "age": 37,
                    "last": [
                        0,
                        1,
                        1,
                        1,
                        0
                    ]
                }
            },
            {
                "id": 52,
                "firstname": "Novak",
                "lastname": "Djokovic",
                "shortname": "N.DJO",
                "sex": "M",
                "country": {
                    "picture": "https://data.latelier.co/training/tennis_stats/resources/Serbie.png",
                    "code": "SRB"
                },
                "picture": "https://data.latelier.co/training/tennis_stats/resources/Djokovic.png",
                "data": {
                    "rank": 2,
                    "points": 2542,
                    "weight": 80000,
                    "height": 188,
                    "age": 31,
                    "last": [
                        1,
                        1,
                        1,
                        1,
                        1
                    ]
                }
            },
            {
                "id": 17,
                "firstname": "Rafael",
                "lastname": "Nadal",
                "shortname": "R.NAD",
                "sex": "M",
                "country": {
                    "picture": "https://data.latelier.co/training/tennis_stats/resources/Espagne.png",
                    "code": "ESP"
                },
                "picture": "https://data.latelier.co/training/tennis_stats/resources/Nadal.png",
                "data": {
                    "rank": 1,
                    "points": 1982,
                    "weight": 85000,
                    "height": 185,
                    "age": 33,
                    "last": [
                        1,
                        0,
                        0,
                        0,
                        1
                    ]
                }
            }
        
    ];

    // Set up the mock response
    mockJson.mockImplementationOnce((data) => {
      expect(mockResponse.status).toHaveBeenCalledWith(200);
      expect(data).toEqual(mockPlayers);
      return mockResponse as Response; // Cast to Response type
    });

    // Call the endpoint function
    controllers.getPlayers(mockRequest as Request, mockResponse as Response);

    // Perform assertions on the response
    expect(mockJson).toHaveBeenCalledTimes(1);
  });
});


describe('getPlayer', () => {
  let mockRequest: Partial<Request>;
  let mockResponse: Partial<Response>;
  let mockJson: jest.Mock;

  beforeEach(() => {
    mockRequest = {
      params: {
        id: '52', // Specify the player ID for testing
      },
    };
    mockJson = jest.fn();
    mockResponse = {
      status: jest.fn().mockReturnThis(),
      json: mockJson,
    };
  });

  it('should return the player if found', () => {
  
    const mockPlayer = {
        
            id: 52,
            firstname: "Novak",
            lastname: "Djokovic",
            shortname: "N.DJO",
            sex: "M",
            country: {
              picture: "https://data.latelier.co/training/tennis_stats/resources/Serbie.png",
              code: "SRB"
            },
            picture: "https://data.latelier.co/training/tennis_stats/resources/Djokovic.png",
            data: {
              rank: 2,
              points: 2542,
              weight: 80000,
              height: 188,
              age: 31,
              last: [1, 1, 1, 1, 1]
            }
          
    };

    // Mock the response to check if it receives the correct status and JSON data
    mockResponse.status = jest.fn().mockImplementationOnce((statusCode) => {
      expect(statusCode).toBe(200);
      return mockResponse;
    });
    mockResponse.json = jest.fn().mockImplementationOnce((data) => {
      expect(data).toEqual(mockPlayer);
      return mockResponse;
    });

    controllers.getPlayer(mockRequest as Request, mockResponse as Response);

    expect(mockResponse.status).toHaveBeenCalled();
    expect(mockResponse.json).toHaveBeenCalled();
  });

  it('should return "Player not found" if player is not found', () => {
  
    mockRequest = {
        params: {
          id: '22', // Specify the player ID for testing
        },
      };
    // Mock the response to check if it receives the correct status and JSON data
    mockResponse.status = jest.fn().mockImplementationOnce((statusCode) => {
      expect(statusCode).toBe(404);
      return mockResponse;
    });
    mockResponse.json = jest.fn().mockImplementationOnce((data) => {
      expect(data).toEqual({ message: 'Player not found' });
      return mockResponse;
    });

    controllers.getPlayer(mockRequest as Request, mockResponse as Response);

    expect(mockResponse.status).toHaveBeenCalled();
    expect(mockResponse.json).toHaveBeenCalled();
  });
});





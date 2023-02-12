export const wordsValidator = {
  $jsonSchema: {
    bsonType: 'object',
    required: ['name', 'user', 'particle', 'defs'],
    properties: {
      name: {
        bsonType: 'string',
        description: 'must be a string and is required'
      },
      user: {
        bsonType: 'objectId',
        description: 'must be a objectId and is required'
      },
      particle: {
        bsonType: 'string',
        description: 'must be a string and is required'
      },
      uuid: {
        bsonType: 'string',
        description: 'must be a string'
      },
      imgUrl: {
        bsonType: 'string',
        description: 'must be a string'
      },
      audioUrl: {
        bsonType: 'string',
        description: 'must be a string'
      },
      transcription: {
        bsonType: 'string',
        description: 'must be a string'
      },
      isOffensive: {
        bsonType: 'bool',
        description: 'must be a boolean'
      },
      stems: {
        bsonType: 'array',
        description: 'must be an array',
        items: {
          bsonType: 'string'
        }
      },
      level: {
        bsonType: 'string',
        description: 'must be a string'
      },
      defs: {
        bsonType: 'array',
        description: 'must be an array and is required',
        items: {
          bsonType: 'object',
          required: ['def'],
          properties: {
            def: {
              bsonType: 'string',
              description: 'must be a string and is required'
            },
            examles: {
              bsonType: 'array',
              description: 'must be an array and is required',
              items: {
                bsonType: 'string'
              }
            }
          }
        }
      }
    }
  }
};

export const userValidator = {
  $jsonSchema: {
    bsonType: 'object',
    required: ['email', 'password', 'firstName', 'lastName'],
    properties: {
      email: {
        bsonType: 'string',
        description: 'must be a string and is required'
      },
      password: {
        bsonType: 'string',
        description: 'must be a string and is required'
      },
      firstName: {
        bsonType: 'string',
        description: 'must be a string and is required'
      },
      lastName: {
        bsonType: 'string',
        description: 'must be a string and is required'
      },
      primaryLanguage: {
        bsonType: 'string',
        description: 'must be a string and is required'
      }
    }
  }
};

exports.wordsValidator = wordsValidator;
exports.userValidator = userValidator;

import { Request, Response } from 'express';

import prisma from '../../prisma/client';

export const getPlantsFromFavorite = async(request: Request, response: Response) => {
  const getFavoritePlants = await prisma.favorites.findMany();

  try {
    response.status(200).json(getFavoritePlants);
  } catch (error) {
    console.error('Database error :', error);
    response.status(500).send('Error getting plants from favorite');
  }
};

export const addPlantToFavorite = async(request: Request, response: Response) => {
  if (!request.body || !request.body.plantId || !request.body.userId) {
    response.status(500).send('Not all information included');
    return;
  }

  try {
    const favorite = await prisma.favorites.create({
      data: {
        plantImage: request.body.plantImage,
        plantId: Number(request.body.plantId),
        plantName: request.body.plantName,
        userId: Number(request.body.userId)
      }
    });

    response.status(201).json(favorite);
  } catch (error) {
    console.error('Database error :', error);
    response.status(500).send('Database error');
  }
};

export const removePlantFromFavorite = async(request: Request, response: Response) => {
  try {
    const deletePlant = await prisma.favorites.deleteMany({
      where: {
        plantId: Number(request.body.plantId),
        userId: Number(request.body.userId)
      }
    });

    response.status(202).json(deletePlant);
  } catch (error) {
    console.error('Database error :', error);
    response.status(500).send('Database error');
  }
};

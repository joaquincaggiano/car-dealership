import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { Car } from './interfaces/car.interface';
import { v4 as uuid } from 'uuid';
import { CreateCarDto } from './dto/create-car.dto';
import { UpdateCarDto } from './dto/update-car.dto';

@Injectable()
export class CarsService {
  private cars: Car[] = [
    // { id: uuid(), brand: 'Toyota', model: 'Corolla' },
    // { id: uuid(), brand: 'Ford', model: 'Mustang' },
    // { id: uuid(), brand: 'Chevrolet', model: 'Camaro' },
  ];

  findAll() {
    return this.cars;
  }

  findOneById(id: string) {
    const car = this.cars.find(car => car.id === id);

    if (!car) throw new NotFoundException(`Car with id ${id}, not found`);

    return car;
  }

  create(createCarDto: CreateCarDto) {
    const newCar: Car = {
      id: uuid(),
      ...createCarDto,
    };

    this.cars.push(newCar);
    return newCar;
  }

  update(id: string, updateCardDto: UpdateCarDto) {
    let carDB = this.findOneById(id);

    if (updateCardDto.id && updateCardDto.id !== id) {
      throw new BadRequestException(`Car id is not valid`);
    }

    this.cars = this.cars.map(car => {
      if (car.id === id) {
        carDB = { ...carDB, ...updateCardDto, id };
        return carDB;
      }
      return car;
    });

    return carDB;
  }

  delete(id: string) {
    this.findOneById(id);

    this.cars = this.cars.filter(car => car.id !== id);

    return {
      message: `Car ${id} deleted`,
    };
  }
}

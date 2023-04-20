package lab4.mpp.labb4.service;

import jakarta.persistence.EntityManager;
import jakarta.persistence.PersistenceContext;
import jakarta.persistence.TypedQuery;
import jakarta.persistence.criteria.*;
import lab4.mpp.labb4.app.CarNotFoundException;
import lab4.mpp.labb4.domain.*;
import lab4.mpp.labb4.repo.BookingRepository;
import lab4.mpp.labb4.repo.CarRepository;
import org.modelmapper.ModelMapper;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageImpl;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;
import org.springframework.web.bind.annotation.*;

import java.util.*;
import java.util.stream.Collectors;

@Service
public
class CarService {

    private final CarRepository repository;

    private final BookingRepository bookingRepo;
    @PersistenceContext
    private EntityManager em;

    public CarService(CarRepository repository, BookingRepository bookingRepo) {
        this.repository = repository;
        this.bookingRepo = bookingRepo;
    }

    // Aggregate root
    public List<CarDTO> all() {
//        return repository.findAll();

        ModelMapper modelMapper = new ModelMapper();
        modelMapper.typeMap(Car.class, CarDTO.class);
        PageRequest pageRequest = PageRequest.of(0,50);
        List<CarDTO> carDTOS = repository.findAll(pageRequest).stream()
                .map(car->modelMapper.map(car,CarDTO.class))
                .collect(Collectors.toList());
        return carDTOS;
        //-------------
        //modelMapper.typeMap(Customer.class, CustomerDTO.class).addMapping(Customer::getAddress,CustomerDTO::setAddress);
        //List<Car> customers=repository.findAll();
        //List<CarDTO> customerDTOS=customers.stream()
        //        .map(customer->modelMapper.map(customer,CarDTO.class)).collect(Collectors.toList());
        //return customerDTOS;
//        ModelMapper modelMapper = new ModelMapper();
//        List<Car> cars = repository.findAll();
//        List<CarDTO> carDTOS = cars.stream()
//                .map(car -> modelMapper.map(car, CarDTO.class))
//                .collect(Collectors.toList());
//        return carDTOS;
    }
    // end::get-aggregate-root[]

    public List<CarDTO> findByPublished(PageRequest pr) {
        ModelMapper modelMapper = new ModelMapper();
        //List<RecordLable> recordLables = rLrepo.findAll();
        Page<Car> cars = repository.findAll(pr);
        List<CarDTO> carsDTOS = cars.stream()
                .map(recordLable -> modelMapper.map(recordLable, CarDTO.class))
                .collect(Collectors.toList());
        return carsDTOS;
    }

    public Car newCar( Car newCar) {
        return repository.save(newCar);
    }

//    @PostMapping("/cars/{carId}/bookings")
//    BookingDetails newBookingForCar(@PathVariable Long carId, @RequestBody BookingDetails newBooking) {
//        // Find the client by ID
//        Car car = repository.findById(carId)
//                .orElseThrow(() -> new CarNotFoundException(carId));
//
//        // Check if the booking with the given ID already exists
//        BookingDetails existingBooking = null;
//        for (BookingDetails booking : bookingRepo.findAll()) {
//            if (booking.equals(newBooking)) {
//                existingBooking = booking;
//                break;
//            }
//        }
//        if (existingBooking != null) {
//            // If the booking already exists, set the client property and return the existing booking
//            existingBooking.setCar(car);
//            bookingRepo.save(existingBooking);
//            return existingBooking;
//        } else {
//            // If the booking does not exist, set the client property for the new booking
//            newBooking.setCar(car);
//            // Save the new booking to the database
//            BookingDetails savedBooking = bookingRepo.save(newBooking);
//            // Add the new booking to the client
//            car.getBookingDetailsSet().add(savedBooking);
//            // Save the client to update the bookings list
//            repository.save(car);
//            return savedBooking;
//        }
//    }

    // Single item

    public Car oneCar( String id){
        Long carId = Long.parseLong(id);
        return repository.findById(carId)
                .orElseThrow(() -> new CarNotFoundException(carId));
    }

    public CarDTOWithClients one ( String id){
//        Optional<Car> carOptional = repository.findById(id);
//        if (!carOptional.isPresent()) {
//            throw new ClientNotFoundException(id);
//        }
//        Car cars = carOptional.get();
//        ModelMapper modelMapper=new ModelMapper();
//        List<CarDTO> carsDTO = new ArrayList<>();
//        for (BookingDetails booking : cars.getBookingDetailsSet()) {
//            Car car = booking.getCar();
//            if (car != null) {
//                CarDTO carDTO = modelMapper.map(car, CarDTO.class);
//                carsDTO.add(carDTO);
//            }
//        }
//        CarDTO clientDTO = modelMapper.map(cars, CarDTO.class);
//        return clientDTO;
        Long longInt = Long.parseLong(id);
        Car car=repository.findById(longInt).get();
        CarDTOWithClients carDTOWithClients=new CarDTOWithClients();
        List<Long> adoptionIds=new ArrayList<>();
        List<BookingDetails> bookingDetails=bookingRepo.findAll();
        for(BookingDetails ac:bookingDetails)
            if(ac.getCar().getId()== car.getId())
                adoptionIds.add(ac.getClient().getId());
        carDTOWithClients.setClientsIds(adoptionIds);
        carDTOWithClients.setCar(car);
        return  carDTOWithClients;
//        if(repository.findById(id).isEmpty())
//            throw new CarNotFoundException(id);
//        ModelMapper modelMapper=new ModelMapper();
//        modelMapper.typeMap(Car.class,CarDTO.class).addMapping(car -> {
//            List<BookingDetails> bookings = car.getBookingDetailsSet();
//            if(bookings!=null){
//                return bookings.stream().map(bookingDetails -> modelMapper.map(bookingDetails, BookingDTOWithID.class)).collect(Collectors.toList());
//            }
//            else{
//                return Collections.emptyList();
//            }
//        },CarDTO::setBookings);
//        CarDTO carsDto = modelMapper.map(repository.findById(id).get(),CarDTO.class);
//        return carsDto;
    }

    public Car replaceCar( Car newCar,  Long id) {

        return repository.findById(id)
                .map(car -> {
                    car.setModel(newCar.getModel());
                    car.setBrand(newCar.getBrand());
                    car.setColor(newCar.getColor());
                    car.setYear_manufacture(newCar.getYear_manufacture());
                    car.setNrkilometers(newCar.getNrkilometers());
                    return repository.save(car);
                })
                .orElseGet(() -> {
                    newCar.setId(id);
                    return repository.save(newCar);
                });
    }

    public void deleteCar( Long id) {
        repository.deleteById(id);
    }

    public List<Car> byNrKilometers( int minNrKilometers) {
        return repository.findByNrkilometersGreaterThanEqual(minNrKilometers);
    }

    //all the cars ordered by the average booking's price
    public Page<CarsDTOStatisticsBookingPrice> getAllCarsOrderByAvgBookingPrice(PageRequest pageable) {
        List<Car> cars = repository.findAll();
        List<CarsDTOStatisticsBookingPrice> carsDTOStatisticsBookingsPrices = new ArrayList<>();
        ModelMapper modelMapper = new ModelMapper();
        for (Car car : cars) {
            double sum = 0.0;
            int count = 0;
            for (BookingDetails booking : car.getBookingDetailsSet()) {
                sum += booking.getAmount();
                count++;
            }
            double avgPrice = count > 0 ? sum / count : 0.0;
            avgPrice=Math.round(avgPrice * 100.0) / 100.0;
            CarsDTOStatisticsBookingPrice carsDTOStatisticsBookingPrice = modelMapper.map(car, CarsDTOStatisticsBookingPrice.class);
            carsDTOStatisticsBookingPrice.setAgvBookingPrice(avgPrice);
            carsDTOStatisticsBookingsPrices.add(carsDTOStatisticsBookingPrice);
        }
        carsDTOStatisticsBookingsPrices.sort(Comparator.comparingDouble(CarsDTOStatisticsBookingPrice::getAgvBookingPrice).reversed());
        return new PageImpl<>(carsDTOStatisticsBookingsPrices, pageable, cars.size());
    }

    public Long countAllCars() {
        return repository.count();
    }


//    public Page<CarsDTOStatisticsBookingPrice> getAllCarsOrderByAvgBookingPricePaged(Pageable pageable) {
//        CriteriaBuilder cb = em.getCriteriaBuilder();
//        CriteriaQuery<Object[]> cq = cb.createQuery(Object[].class);
//        Root<Car> cars = cq.from(Car.class);
//        Join<Car, BookingDetails> carBookingsJoin = cars.join("booking_details", JoinType.LEFT);
//        cq
//                .multiselect(cars, cb.count(carBookingsJoin))
//                .groupBy(cars)
//                .orderBy(cb.desc(cb.count(carBookingsJoin)));
//        TypedQuery<Object[]> typedQuery = em.createQuery(cq);
//
//
//        List<CarsDTOStatisticsBookingPrice> results = typedQuery
//                .setFirstResult(pageable.getPageNumber() * pageable.getPageSize())
//                .setMaxResults(pageable.getPageSize())
//                .getResultStream()
//                .map(row -> {
//                    return new CarsDTOStatisticsBookingPrice(
//                            CarDTO.((Car) row[0]),
//                            ((Long) row[1]).intValue()
//                    );
//                })
//                .toList();
//
//        CriteriaQuery<Long> count_cq = cb.createQuery(Long.class);
//        count_cq.select(cb.count(count_cq.from(Car.class)));;
//        long total = em.createQuery(count_cq).getSingleResult();
//
//        return new PageImpl<>(results, pageable, total);
//    }
}


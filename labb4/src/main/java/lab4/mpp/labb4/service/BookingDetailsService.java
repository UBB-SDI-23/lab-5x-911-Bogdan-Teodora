package lab4.mpp.labb4.service;

import lab4.mpp.labb4.app.BookingNotFoundException;
import lab4.mpp.labb4.domain.*;
import lab4.mpp.labb4.repo.BookingRepository;
import lab4.mpp.labb4.repo.CarRepository;
import lab4.mpp.labb4.repo.ClientRepository;
import org.modelmapper.ModelMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.web.bind.annotation.*;

import java.util.ArrayList;
import java.util.List;
import java.util.stream.Collectors;

@RestController
public
class BookingDetailsService {

    @Autowired
    private final BookingRepository repository;
    private final ClientRepository clientRepository;
    private final CarRepository carRepository;

    public BookingDetailsService(BookingRepository repository, ClientRepository clientRepository, CarRepository carRepository) {
        this.repository = repository;
        this.clientRepository = clientRepository;
        this.carRepository = carRepository;
    }

    // Aggregate root
    // tag::get-aggregate-root[]
    public List<BookingDTOWithID> all() {
//        return repository.findAll();
//        ModelMapper modelMapper= new ModelMapper();
//        modelMapper.typeMap(BookingDetails.class, BookingDTOWithID.class);
//        List<BookingDTOWithID> bookingDTOWithIDS = repository.findAll().stream()
//                .map(booking -> modelMapper.map(booking, BookingDTOWithID.class))
//                .collect(Collectors.toList());
//        return bookingDTOWithIDS;
        ModelMapper modelMapper = new ModelMapper();
        modelMapper.typeMap(BookingDetails.class, BookingDTOWithID.class);

        List<BookingDetails> bookingDetails = repository.findAll();
        return bookingDetails.stream()
                .map(adoptionCustomer -> modelMapper.map(adoptionCustomer, BookingDTOWithID.class))
                .collect(Collectors.toList());
    }
    // end::get-aggregate-root[]

    public List<BookingDTOWithID> allPaged(PageRequest pr) {
        ModelMapper modelMapper = new ModelMapper();
        //List<RecordLable> recordLables = rLrepo.findAll();
        Page<BookingDetails> bookingDetails = repository.findAll(pr);
        modelMapper.typeMap(BookingDetails.class,BookingDTOWithID.class).addMapping(client -> client.getCar().getId(),BookingDTOWithID::setCarId);
        modelMapper.typeMap(BookingDetails.class,BookingDTOWithID.class).addMapping(client -> client.getClient().getId(),BookingDTOWithID::setClientId);
        List<BookingDTOWithID> clientsDTOs = bookingDetails.stream()
                .map(client -> modelMapper.map(client, BookingDTOWithID.class))
                .collect(Collectors.toList());
        return clientsDTOs;
    }

    public BookingDetails newBooking( BookingDetails newBooking,  Long clientId, @PathVariable Long carId) {
        //return repository.save(newBooking);
        Client client = clientRepository.findById(clientId).get();
        Car car = carRepository.findById(carId).get();
        newBooking.setClient(client);
        newBooking.setCar(car);
        newBooking=repository.save(newBooking);

        client.getBookingDetailsSet().add(newBooking);
        car.getBookingDetailsSet().add(newBooking);
        return newBooking;
    }

    public BookingDetails addBooking( BookingDTOWithID newBooking) {
        BookingDTOWithID newB = new BookingDTOWithID();
        BookingDetails ac = new BookingDetails();
        ac.setAmount(newBooking.getAmount());
        ac.setDrop_loc(newBooking.getDrop_loc());
        ac.setPickup_loc(newBooking.getPickup_loc());
        ac.setStartDate(newBooking.getStartDate());
        ac.setReturnDate(newBooking.getReturnDate());
        ac.setBookingStatus(newBooking.getBookingStatus());
        Car selectedCar=carRepository.findById(newBooking.getCarId()).get();
        ac.setCar(selectedCar);
        Client selectedClient=clientRepository.findById(newBooking.getClientId()).get();
        ac.setClient(selectedClient);
        ac=repository.save(ac);
        return ac;
    }

    public List<BookingDetails> newClientCarList( List<BookingDTOWithID> BookingDetList, Long carId) {
        Car selectedCar=carRepository.findById(carId).get();
        List<BookingDetails> finalLits= new ArrayList<>();
        for(BookingDTOWithID bddto:BookingDetList){
            BookingDetails ac=new BookingDetails();
            ac.setAmount(bddto.getAmount());
            ac.setDrop_loc(bddto.getDrop_loc());
            ac.setPickup_loc(bddto.getPickup_loc());
            ac.setStartDate(bddto.getStartDate());
            ac.setReturnDate(bddto.getReturnDate());
            ac.setBookingStatus(bddto.getBookingStatus());
            ac.setCar(selectedCar);
            Client selectedClient=clientRepository.findById(bddto.getClientId()).get();
            ac.setClient(selectedClient);
            ac=repository.save(ac);
            finalLits.add(ac);
        }
        return finalLits;
    }

    // Single item

    public BookingDTO one( Long id) {

        //return repository.findByIdBooking(id);
//        if (repository.findById(id).isEmpty())
//            throw new BookingNotFoundException(id);
//
//        ModelMapper modelMapper = new ModelMapper();
//        BookingDTO bookingDTO = modelMapper.map(repository.findById(id).get(), BookingDTO.class);
//        return bookingDTO;
        if (repository.findById(id).isEmpty())
            throw new BookingNotFoundException(id);

        ModelMapper modelMapper = new ModelMapper();
        modelMapper.typeMap(BookingDetails.class, BookingDTO.class);

        BookingDetails adoptionCustomer=repository.findById(id).get();
        return  modelMapper.map(adoptionCustomer, BookingDTO.class);
    }

    public BookingDTOWithID oneBooking( Long id) {
        if (repository.findById(id).isEmpty())
            throw new BookingNotFoundException(id);

        ModelMapper modelMapper = new ModelMapper();
        modelMapper.typeMap(BookingDetails.class, BookingDTOWithID.class);

        BookingDetails adoptionCustomer=repository.findById(id).get();
        return  modelMapper.map(adoptionCustomer, BookingDTOWithID.class);
    }

    public BookingDetails replaceBooking( BookingDetails newBooking, Long id) {

        return repository.findById(id)
                .map(bookingDetails -> {
                    bookingDetails.setStartDate(newBooking.getStartDate());
                    bookingDetails.setReturnDate(newBooking.getReturnDate());
                    bookingDetails.setAmount(newBooking.getAmount());
                    bookingDetails.setBookingStatus(newBooking.getBookingStatus());
                    bookingDetails.setDrop_loc(newBooking.getDrop_loc());
                    bookingDetails.setPickup_loc(newBooking.getPickup_loc());
//                    bookingDetails.setClient(newBooking.getClient());
                    return repository.save(bookingDetails);
                })
                .orElseGet(() -> {
                    newBooking.setId(id);
                    return repository.save(newBooking);
                });
    }

    public void deleteBooking( Long id) {
        repository.deleteById(id);
    }

    public List<BookingDetails> byAmount( int minAmount) {
        return repository.findByAmountGreaterThanEqual(minAmount);
    }

    public Long countAllBookings() {
        return repository.count();
    }
}


package lab4.mpp.labb4.controller;

import jakarta.validation.Valid;
import lab4.mpp.labb4.app.ClientNotFoundException;
import lab4.mpp.labb4.domain.*;
import lab4.mpp.labb4.repo.*;
import lab4.mpp.labb4.service.ClientService;
import org.modelmapper.ModelMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.PageRequest;
import org.springframework.validation.FieldError;
import org.springframework.web.bind.MethodArgumentNotValidException;
import org.springframework.web.bind.annotation.*;

import java.util.*;
import java.util.stream.Collectors;


@RestController
class ClientController {

    private final ClientService clientService;
//    @Autowired
//    private final ClientRepository repository;
//    private final BookingRepository bookingRepo;
//    private final AddressRepository addrRepo;
//
//    ClientController(ClientRepository repository, BookingRepository bookingRepo, AddressRepository addrRepo) {
//        this.repository = repository;
//        this.bookingRepo = bookingRepo;
//        this.addrRepo = addrRepo;
//    }

    public ClientController(ClientService clientService) {
        this.clientService = clientService;
    }


    // Aggregate root
    // tag::get-aggregate-root[]

//    List<Client> all() {
//        return repository.findAll();
//    }
    @GetMapping("/clients")
    List<ClientDTO> all() {
        return clientService.all();
    }
    // end::get-aggregate-root[]

    @GetMapping("/clients/paged")
    public List<ClientDTO> AllPaged(
            @RequestParam int page,
            @RequestParam(value = "size", defaultValue = "10", required = false) int size) {
        PageRequest pr = PageRequest.of(page, size);
        return this.clientService.allClientsPaged(pr).stream().map(car -> car.getClientDTO(clientService.getBookingsCount(car.getId()))).toList();

//        return clientService.allClientsPaged(pr);
    }

    @PostMapping("/clients/{addressId}")
    Client newClient(@Valid @RequestBody Client newClient,@PathVariable Long addressId) {
        return clientService.newClient(newClient, addressId);
    }

    @PostMapping("/clients/add")
    Client addClient(@RequestBody ClientDTO newClient) {
        return clientService.addClient(newClient);
    }

//    @PostMapping("/clients/{clientId}/bookings")
//    BookingDetails newBookingForClient(@PathVariable Long clientId, @RequestBody BookingDetails newBooking) {
//        // Find the client by ID
//        Client client = repository.findById(clientId)
//                .orElseThrow(() -> new ClientNotFoundException(clientId));
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
//            existingBooking.setClient(client);
//            bookingRepo.save(existingBooking);
//            return existingBooking;
//        } else {
//            // If the booking does not exist, set the client property for the new booking
//            newBooking.setClient(client);
//            // Save the new booking to the database
//            BookingDetails savedBooking = bookingRepo.save(newBooking);
//            // Add the new booking to the client
//            client.getBookingDetailsSet().add(savedBooking);
//            // Save the client to update the bookings list
//            repository.save(client);
//            return savedBooking;
//        }
//    }

    // Single item

//    @GetMapping("/clients/{id}")
//    Client one(@PathVariable Long id) {
//        return repository.findById(id)
//                .orElseThrow(() -> new ClientNotFoundException(id));
//    }
    @GetMapping("/clients/{id}")
    ClientDTOWithCarsIds one (@PathVariable Long id){
        return clientService.one(id);
    }

    @GetMapping("/clients/{id}/details")
    ClientDTO oneClient (@PathVariable String id){
        return clientService.oneClient(id);
    }

    @PutMapping("/clients/{id}/edit")
    Client replaceClient(@RequestBody Client newClient, @PathVariable Long id) {
        return clientService.replaceClient(newClient,id);
    }

    @DeleteMapping("/clients/{id}/delete")
    void deleteClient(@PathVariable Long id) {
        clientService.deleteClient(id);
    }

    //statistics: show the clients orderd by the average of the number of kilometers of their booked/reserved cars
    @GetMapping("/clients/statistics")
    public List<ClientsDTOStatisticsCars> getClientsStatistics() {
        return clientService.getClientsStatistics();
    }

    @ExceptionHandler(MethodArgumentNotValidException.class)
    public Map<String, String> handleValidationExceptions(MethodArgumentNotValidException ex)
    {
        Map<String, String> errors = new HashMap<>();
        ex.getBindingResult().getAllErrors().forEach((error) -> {
            String fieldName =((FieldError) error).getField();
            String errorMessage =error.getDefaultMessage();
            errors.put(fieldName, errorMessage);
        });
        return errors;
    }

    @GetMapping("/clients/countAll")
    public Long countAllClients()
    {
        return this.clientService.countAllClients();
    }

    @GetMapping("/clients/autocomplete")
    public List<Client> getClientsSuggestions(@RequestParam String query)
    {
        return this.clientService.getClientsNameAutocomplete(query);
    }

}


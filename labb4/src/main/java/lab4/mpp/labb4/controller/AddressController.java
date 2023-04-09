package lab4.mpp.labb4.controller;

import lab4.mpp.labb4.app.AddressNotFoundException;
import lab4.mpp.labb4.domain.Address;
import lab4.mpp.labb4.domain.AddressDTO;
import lab4.mpp.labb4.repo.AddressRepository;
import lab4.mpp.labb4.repo.ClientRepository;
import lab4.mpp.labb4.service.AddressService;
import org.modelmapper.ModelMapper;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.stream.Collectors;

@RestController
//@Service
class AddressController {
    private final AddressService addressService;
//    private final AddressRepository repository;
//    private ClientRepository clientrepo;
//
//    public AddressController(AddressRepository repository, ClientRepository clientrepo) {
//        this.repository = repository;
//        this.clientrepo = clientrepo;
//    }


    public AddressController(AddressService addressService) {
        this.addressService = addressService;
    }

    // Aggregate root
    // tag::get-aggregate-root[]
    @GetMapping("/addresses")
    List<AddressDTO> all() {
        return addressService.all();
    }
    // end::get-aggregate-root[]

    @PostMapping("/addresses")
    Address newAddress(@RequestBody Address newAddress) {
        return addressService.newAddress(newAddress);
    }

    // Single item

    @GetMapping("/addresses/{id}")
    Address one(@PathVariable Long id) {
        return addressService.one(id);
    }

    @PutMapping("/addresses/{id}")
    Address replaceAddress(@RequestBody Address newAddress, @PathVariable Long id) {
        return addressService.replaceAddress(newAddress,id);
    }

    @DeleteMapping("/addresses/{id}")
    void deleteAddress(@PathVariable Long id) {
        addressService.deleteAddress(id);
    }

//    @GetMapping("/cars/nrKilometers/{minNrKilometers}")
//    List<Car> byNrKilometers(@PathVariable int minNrKilometers) {
//        return repository.findByNrkilometersGreaterThanEqual(minNrKilometers);
//    }
}


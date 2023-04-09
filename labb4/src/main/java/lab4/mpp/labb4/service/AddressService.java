package lab4.mpp.labb4.service;

import lab4.mpp.labb4.app.AddressNotFoundException;
import lab4.mpp.labb4.domain.Address;
import lab4.mpp.labb4.domain.AddressDTO;
import lab4.mpp.labb4.repo.AddressRepository;
import lab4.mpp.labb4.repo.ClientRepository;
import org.modelmapper.ModelMapper;
import org.springframework.stereotype.Service;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.stream.Collectors;

@Service
public
class AddressService {
    private final AddressRepository repository;
    private ClientRepository clientrepo;

    public AddressService(AddressRepository repository, ClientRepository clientrepo) {
        this.repository = repository;
        this.clientrepo = clientrepo;
    }

    // Aggregate root
    // tag::get-aggregate-root[]
    public List<AddressDTO> all() {
//        return repository.findAll();
        ModelMapper modelMapper = new ModelMapper();
        List<Address> passengers = repository.findAll();
        return passengers.stream()
                .map(addr -> modelMapper.map(addr, AddressDTO.class))
                .collect(Collectors.toList());
    }
    // end::get-aggregate-root[]

    public Address newAddress( Address newAddress) {
        return repository.save(newAddress);
    }

    // Single item
    public Address one( Long id) {

        return repository.findById(id)
                .orElseThrow(() -> new AddressNotFoundException(id));
    }
    public Address replaceAddress( Address newAddress,  Long id) {

        return repository.findById(id)
                .map(car -> {
                    car.setCountry(newAddress.getCountry());
                    car.setCounty(newAddress.getCounty());
                    car.setCity(newAddress.getCity());
                    car.setAdditional_info(newAddress.getAdditional_info());
                    return repository.save(car);
                })
                .orElseGet(() -> {
                    newAddress.setAddress_id(id);
                    return repository.save(newAddress);
                });
    }
    public void deleteAddress( Long id) {
        if(clientrepo.existsById(id)){
            clientrepo.deleteById(id);
        }
        repository.deleteById(id);
    }

//    @GetMapping("/cars/nrKilometers/{minNrKilometers}")
//    List<Car> byNrKilometers(@PathVariable int minNrKilometers) {
//        return repository.findByNrkilometersGreaterThanEqual(minNrKilometers);
//    }
}


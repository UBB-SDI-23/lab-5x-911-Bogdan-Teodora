package lab4.mpp.labb4.repo;

import lab4.mpp.labb4.domain.Client;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.EntityGraph;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Component;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Map;

@Repository
@Component
public interface ClientRepository extends JpaRepository<Client, Long> {

    @Query("SELECT COUNT(c) FROM BookingDetails c WHERE c.client.idClient = :idClient")
    Integer countBookingsByClientsId(@Param("idClient") Long idClient);

//    @Query("SELECT b.client.idClient, COUNT(DISTINCT b.id_booking) FROM BookingDetails b WHERE b.client.idClient IN :idClient GROUP BY b.client.idClient")
//    Map<Long, Long> countBookingsByClientsIds(@Param("idClient") List<Long> idClient);

    @Query("SELECT c.idClient, COUNT(b.id_booking) FROM Client c LEFT JOIN BookingDetails b ON b.client.idClient = c.idClient GROUP BY c.idClient")
    Map<Long, Long> countBookingsByClientsIds();


//    @EntityGraph(value = Client.GRAPH_ADDRESS, type = EntityGraph.EntityGraphType.FETCH)
//    Page<Client> findAll(Pageable pageable);
}

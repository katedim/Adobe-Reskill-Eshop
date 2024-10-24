package EshopProject.EshopBackend.model;

import com.fasterxml.jackson.annotation.JsonBackReference;
import jakarta.persistence.*;

import java.util.HashSet;
import java.util.Set;

@Entity
@Table(name = "Cart")
public class Cart {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private long id;

    @OneToOne
    @JoinColumn(name = "user_id", unique = true, nullable = false) // Unique constraint for one-to-one relationship
    @JsonBackReference
    private appUser user;

    @ManyToMany(cascade = {CascadeType.PERSIST, CascadeType.MERGE, CascadeType.REMOVE})
    private Set<Product> productItems = new HashSet<>();

    // Getters and setters
    public long getId() {
        return id;
    }

    public void setId(long id) {
        this.id = id;
    }

    public appUser getUser() {
        return user;
    }

    public void setUser(appUser user) {
        this.user = user;
    }

    public Set<Product> getProductItems() {
        return productItems;
    }

    public void setProductItems(Set<Product> productItems) {
        this.productItems = productItems;
    }
}

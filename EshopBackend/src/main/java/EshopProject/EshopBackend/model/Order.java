package EshopProject.EshopBackend.model;

import com.fasterxml.jackson.annotation.JsonBackReference;
import com.fasterxml.jackson.annotation.JsonManagedReference;
import jakarta.persistence.*;
import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.List;
import java.util.Set;

@Table(name = "Orders")
@Entity
public class Order {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private long id;

    @Column(name = "created_date", nullable = false, updatable = false)
    private LocalDateTime createdDate;

    @Enumerated(EnumType.STRING)
    @Column(name = "state", nullable = false)
    private OrderState state;

    @ManyToOne
    @JoinColumn(name = "user_id")
    @JsonBackReference
    private appUser user;

//
//    @OneToMany(mappedBy = "order", cascade = CascadeType.ALL, orphanRemoval = true)
//    private List<Product> products = new ArrayList<>();

    public Order() {
        this.createdDate = LocalDateTime.now();
        this.state = OrderState.IN_PROGRESS;
    }

    @ManyToMany(cascade = {CascadeType.PERSIST, CascadeType.MERGE, CascadeType.REMOVE})
    Set<Product> productItems;


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

//    public List<Product> getProducts() {
//        return products;
//    }
//
//    public void setProducts(List<Product> products) {
//        this.products = products;
//    }
//

    public LocalDateTime getCreatedDate() {
        return createdDate;
    }

    public void setCreatedDate(LocalDateTime createdDate) {
        this.createdDate = createdDate;
    }

    public OrderState getState() {
        return state;
    }

    public void setState(OrderState state) {
        this.state = state;
    }

    public enum OrderState {
        IN_PROGRESS,
        DELIVERED,
        CART
    }

    public Set<Product> getProductItems() {
        return productItems;
    }

    public void setProductItems(Set<Product> productItems) {
        this.productItems = productItems;
    }
}

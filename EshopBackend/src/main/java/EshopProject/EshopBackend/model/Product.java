package EshopProject.EshopBackend.model;

import com.fasterxml.jackson.annotation.JsonBackReference;
import com.fasterxml.jackson.annotation.JsonManagedReference;
import jakarta.persistence.*;

import java.util.ArrayList;
import java.util.List;
import java.util.Set;

@Table(name = "Product")
@Entity
public class Product {

    @Id
    @Column(name = "ID")
    @GeneratedValue(strategy=GenerationType.IDENTITY)
    private long id;


    @Column(name = "product_name")
    private String product_name;

    @Column(name = "product_description")
    private String product_description;

    @Column(name = "product_category")
    private String product_category;

    @Column(name = "product_price")
    private float product_price;

    @Column(name = "product_sale_price")
    private float product_sale_price;

    @Column(name = "product_stock")
    private int product_stock;

    @Column(name = "product_reviews")
    private String product_reviews;

//    @ManyToOne
//    @JoinColumn(name = "order_id")
//    @JsonBackReference
//    private Order order;
//@ManyToMany
//Set<Order> items;


    public long getId() {
        return id;
    }

    public void setId(long id) {
        this.id = id;
    }

    public String getProduct_name() {
        return product_name;
    }

    public void setProduct_name(String product_name) {
        this.product_name = product_name;
    }

    public String getProduct_description() {
        return product_description;
    }

    public void setProduct_description(String product_description) {
        this.product_description = product_description;
    }

    public String getProduct_category() {
        return product_category;
    }

    public void setProduct_category(String product_category) {
        this.product_category = product_category;
    }

    public float getProduct_price() {
        return product_price;
    }

    public void setProduct_price(float product_price) {
        this.product_price = product_price;
    }

    public float getProduct_sale_price() {
        return product_sale_price;
    }

    public void setProduct_sale_price(float product_sale_price) {
        this.product_sale_price = product_sale_price;
    }

    public int getProduct_stock() {
        return product_stock;
    }

    public void setProduct_stock(int product_stock) {
        this.product_stock = product_stock;
    }

    public String getProduct_reviews() {
        return product_reviews;
    }

    public void setProduct_reviews(String product_reviews) {
        this.product_reviews = product_reviews;
    }

//    public Set<Order> getItems() {
//        return items;
//    }
//
//    public void setItems(Set<Order> items) {
//        this.items = items;
//    }
}

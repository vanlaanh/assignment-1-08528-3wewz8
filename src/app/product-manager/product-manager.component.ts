import { Component, OnInit } from "@angular/core";
import { ProductService } from "../product.service";
import { Product } from "../product";
import { ActivatedRoute, Router } from "@angular/router";

@Component({
  selector: "app-product-manager",
  templateUrl: "./product-manager.component.html",
  styleUrls: ["./product-manager.component.css"]
})
export class ProductManagerComponent implements OnInit {
  selected: Product;
  products: Product[];

  constructor(
    private productService: ProductService,
    private route: ActivatedRoute,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.getProducts();
  }

  getProducts() {
    this.route.params.subscribe(param => {
      this.productService.getProducts().subscribe(data => {
        this.products = data;
      });
    });
  }

  removeProduct(id){
   this.productService.removeProduct(id).subscribe(response => {
     this.products = this.products.filter(product => product.id != response.id);
   })
    // this.products = this.products.filter(product => product.id != id);
  }
}

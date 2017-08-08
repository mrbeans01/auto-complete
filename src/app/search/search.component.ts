import {Component, OnInit, Input, Output, EventEmitter, OnChanges, SimpleChanges, SimpleChange} from '@angular/core';
import {Product} from '../model/product'
import {ProductService} from '../services/product.service'

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.scss']
})
export class SearchComponent implements OnInit, OnChanges {
  products: Product[];
  minChar: number;
  found: boolean;
  myProduct: string;
  selectedProduct: Product;
  filteredProducts: Product[];
  arrowkeyLocation: number = -1;
  go: boolean;

  constructor(private productService: ProductService) {

  }


  ngOnInit() {
    this.go = true;
    this.minChar = 3;
    this.filteredProducts = [];
    this.productService.getAllProducts().then(products => {

        let uniqueArra = [];
        let uniqueProduct: Product[] = [];
        for (let i = 0, len = products.length; i < len; i++) {
          let index = JSON.stringify(products[i]);
          if (uniqueArra.indexOf(index) < 0) {
            uniqueArra.push(index);
            uniqueProduct.push(products[i]);
          }
        }

        uniqueProduct.sort(function (a, b) {
          var nameA = a.name.toUpperCase();
          var nameB = b.name.toUpperCase();
          if (nameA < nameB) {
            return -1;
          }
          if (nameA > nameB) {
            return 1;
          }
          return 0;
        });
        this.products = uniqueProduct;
      }
    );
  }

  @Input() hideList;
  @Output() outputEvent: EventEmitter<boolean> = new EventEmitter();



  filterData(key) {
    this.selectedProduct = null;
    let str = key.trim();
    this.filteredProducts = [];
    if (str.length < this.minChar) {
      return;
    }
    this.filteredProducts = this.products.filter(function (obj, index, arr) {
      if (obj.name.toLowerCase().indexOf(key.toLowerCase()) > -1) {
        return true
      } else {
        return false
      }
    });
    if (this.filteredProducts.length) {
      this.found = true;
      this.outputEvent.emit(true);
    } else {
      this.found = false;
    }
    this.arrowkeyLocation = -1;
  }

  selectProduct(selectedProduct: Product) {
    this.selectedProduct = selectedProduct;
    this.myProduct = this.selectedProduct.name;
    this.filteredProducts = [];
  }

  keyPress(e) {
    if (e.which === 40) {
      this.arrowkeyLocation++;
      if (this.arrowkeyLocation >= this.filteredProducts.length) {
        this.arrowkeyLocation = 0;
      }
      this.selectedProduct = this.filteredProducts[this.arrowkeyLocation];
    } else if (e.which === 38) {
      this.arrowkeyLocation--;
      this.selectedProduct = this.filteredProducts[this.arrowkeyLocation];
      if (this.arrowkeyLocation < 0) {
        this.arrowkeyLocation = this.filteredProducts.length;
      }
    } else if (e.which === 13) {
      this.selectProduct(this.filteredProducts[this.arrowkeyLocation]);
    }
  }

  getClass(product: Product) {

    if (product) {
      if (product.type == 'BANK') {
        return 'bank';
      } else if (product.type == 'CREDIT_CARD') {
        return 'cc';
      } else if (product.type == 'LOAN') {
        return 'loan';
      } else if (product.type == 'INVESTMENT') {
        return 'invest';
      } else if (product.type == 'MORTGAGE') {
        return 'mort';
      }
    } else {
      return ''
    }

  }

  ngOnChanges(changes: SimpleChanges) {
    const name: SimpleChange = changes.hideList;
    if (name && name.currentValue) {
      this.filteredProducts = [];
    }
  }
}

import Map "mo:core/Map";
import Set "mo:core/Set";
import Array "mo:core/Array";
import Order "mo:core/Order";
import Principal "mo:core/Principal";
import Runtime "mo:core/Runtime";
import Iter "mo:core/Iter";
import Nat "mo:core/Nat";
import Time "mo:core/Time";
import Storage "blob-storage/Storage";
import AccessControl "authorization/access-control";
import MixinAuthorization "authorization/MixinAuthorization";
import MixinStorage "blob-storage/Mixin";
import Text "mo:core/Text";

actor {
  // Initialize the access control state
  let accessControlState = AccessControl.initState();
  include MixinAuthorization(accessControlState);
  include MixinStorage();

  // User Profile type
  public type UserProfile = {
    name : Text;
    email : Text;
    phone : Text;
  };

  // Product Category
  public type Category = {
    #Smartphones;
    #LaptopsTablets;
    #Audio;
    #Wearables;
    #Accessories;
  };

  // Product structure
  public type Product = {
    id : Nat;
    name : Text;
    description : Text;
    price : Float;
    rating : Float;
    category : Category;
    brand : Text;
    isNew : Bool;
    isFeatured : Bool;
    image : ?Storage.ExternalBlob;
  };

  // Shopping cart entry
  public type CartEntry = {
    productId : Nat;
    quantity : Nat;
  };

  // Cart type for product IDs only
  public type Cart = {
    productIds : Set.Set<Nat>;
  };

  // Contact message
  public type ContactMessage = {
    id : Nat;
    name : Text;
    email : Text;
    phone : Text;
    message : Text;
    timestamp : Int;
  };

  // Brand structure
  public type Brand = {
    id : Nat;
    name : Text;
    logo : ?Storage.ExternalBlob;
  };

  // Store name
  let storeName = "Trends Electronics";

  // Seed data
  let initialBrands = [
    { id = 1; name = "Apple"; logo = null },
    { id = 2; name = "Samsung"; logo = null },
    { id = 3; name = "Sony"; logo = null },
  ];

  let initialProducts = [
    // Smartphones
    {
      id = 1;
      name = "iPhone 13 Pro";
      description = "Apple's latest smartphone with A15 chip.";
      price = 999.99;
      rating = 4.8;
      category = #Smartphones;
      brand = "Apple";
      isNew = true;
      isFeatured = true;
      image = null;
    },
    {
      id = 2;
      name = "Samsung Galaxy S21";
      description = "Flagship Android phone from Samsung.";
      price = 799.99;
      rating = 4.6;
      category = #Smartphones;
      brand = "Samsung";
      isNew = false;
      isFeatured = true;
      image = null;
    },
    // Laptops & Tablets
    {
      id = 3;
      name = "MacBook Air M1";
      description = "Apple's powerful thin & light laptop.";
      price = 1199.0;
      rating = 4.9;
      category = #LaptopsTablets;
      brand = "Apple";
      isNew = true;
      isFeatured = true;
      image = null;
    },
    {
      id = 4;
      name = "Samsung Galaxy Tab S7";
      description = "High-end Android tablet experience.";
      price = 699.99;
      rating = 4.4;
      category = #LaptopsTablets;
      brand = "Samsung";
      isNew = false;
      isFeatured = false;
      image = null;
    },
    // Audio
    {
      id = 5;
      name = "Sony WH-1000XM4";
      description = "Industry-leading noise cancelling headphones.";
      price = 349.99;
      rating = 4.8;
      category = #Audio;
      brand = "Sony";
      isNew = false;
      isFeatured = true;
      image = null;
    },
    {
      id = 6;
      name = "Apple AirPods Pro";
      description = "Premium wireless earbuds from Apple.";
      price = 249.0;
      rating = 4.7;
      category = #Audio;
      brand = "Apple";
      isNew = true;
      isFeatured = false;
      image = null;
    },
    // Wearables
    {
      id = 7;
      name = "Apple Watch Series 7";
      description = "Smartwatch with health tracking features.";
      price = 399.0;
      rating = 4.5;
      category = #Wearables;
      brand = "Apple";
      isNew = true;
      isFeatured = true;
      image = null;
    },
    {
      id = 8;
      name = "Samsung Galaxy Watch 4";
      description = "Android compatible smartwatch by Samsung.";
      price = 299.99;
      rating = 4.2;
      category = #Wearables;
      brand = "Samsung";
      isNew = false;
      isFeatured = false;
      image = null;
    },
    // Accessories
    {
      id = 9;
      name = "Apple MagSafe Charger";
      description = "Wireless charger for iPhone.";
      price = 39.99;
      rating = 4.6;
      category = #Accessories;
      brand = "Apple";
      isNew = false;
      isFeatured = true;
      image = null;
    },
    {
      id = 10;
      name = "Samsung Fast Charge Pad";
      description = "Fast wireless charger for Galaxy devices.";
      price = 29.99;
      rating = 4.3;
      category = #Accessories;
      brand = "Samsung";
      isNew = false;
      isFeatured = false;
      image = null;
    },
  ];

  // Persistent storage
  let products = Map.empty<Nat, Product>();
  let carts = Map.empty<Principal, Set.Set<Nat>>();
  let contactMessages = Map.empty<Nat, ContactMessage>();
  let brands = Map.empty<Nat, Brand>();
  let productCategories = Map.empty<Nat, Category>();
  let userProfiles = Map.empty<Principal, UserProfile>();

  // Internal counters/IDs
  var productIdCounter = 11;
  var contactIdCounter = 1;
  var brandIdCounter = 4;

  // Initialize state on deployment
  func initializeStore() {
    for (product in initialProducts.values()) {
      products.add(product.id, product);
      productCategories.add(product.id, product.category);
    };

    for (brand in initialBrands.values()) {
      brands.add(brand.id, brand);
    };
  };

  // Only initialize data on first deploy
  if (products.isEmpty()) {
    initializeStore();
  };

  // USER PROFILE MANAGEMENT

  public query ({ caller }) func getCallerUserProfile() : async ?UserProfile {
    if (not (AccessControl.hasPermission(accessControlState, caller, #user))) {
      Runtime.trap("Unauthorized: Only users can view profiles");
    };
    userProfiles.get(caller);
  };

  public query ({ caller }) func getUserProfile(user : Principal) : async ?UserProfile {
    if (caller != user and not AccessControl.isAdmin(accessControlState, caller)) {
      Runtime.trap("Unauthorized: Can only view your own profile");
    };
    userProfiles.get(user);
  };

  public shared ({ caller }) func saveCallerUserProfile(profile : UserProfile) : async () {
    if (not (AccessControl.hasPermission(accessControlState, caller, #user))) {
      Runtime.trap("Unauthorized: Only users can save profiles");
    };
    userProfiles.add(caller, profile);
  };

  // Get store name (public, no auth needed)
  public query ({ caller }) func getStoreName() : async Text {
    storeName;
  };

  // PRODUCT CATALOG MANAGEMENT

  // Add Product (admin only)
  public shared ({ caller }) func adminAddProduct(product : Product) : async Nat {
    if (not (AccessControl.hasPermission(accessControlState, caller, #admin))) {
      Runtime.trap("Unauthorized: Only admins can add products");
    };

    let id = productIdCounter;
    let newProduct : Product = {
      product with id;
    };

    products.add(id, newProduct);
    productCategories.add(id, newProduct.category);

    productIdCounter += 1;
    id;
  };

  // Update Product (admin only)
  public shared ({ caller }) func adminUpdateProduct(id : Nat, product : Product) : async () {
    if (not (AccessControl.hasPermission(accessControlState, caller, #admin))) {
      Runtime.trap("Unauthorized: Only admins can update products");
    };

    if (not products.containsKey(id)) {
      Runtime.trap("Product does not exist");
    };

    let updatedProduct : Product = {
      product with id;
    };

    products.add(id, updatedProduct);
    productCategories.add(id, updatedProduct.category);
  };

  // Delete Product (admin only)
  public shared ({ caller }) func adminDeleteProduct(id : Nat) : async () {
    if (not (AccessControl.hasPermission(accessControlState, caller, #admin))) {
      Runtime.trap("Unauthorized: Only admins can delete products");
    };

    if (not products.containsKey(id)) {
      Runtime.trap("Product does not exist");
    };

    products.remove(id);
    productCategories.remove(id);
  };

  // Get all products (public, no auth needed)
  public query ({ caller }) func getAllProducts() : async [Product] {
    products.values().toArray();
  };

  // Get product by ID (public, no auth needed)
  public query ({ caller }) func getProductById(id : Nat) : async Product {
    switch (products.get(id)) {
      case (null) { Runtime.trap("Product not found") };
      case (?product) { product };
    };
  };

  // Get products by category (public, no auth needed)
  func toProductIdsArray(categoryMap : Map.Map<Nat, Category>) : [Nat] {
    categoryMap.keys().toArray();
  };

  public query ({ caller }) func getProductsByCategory(category : Category) : async [Product] {
    let filteredCategoryMap = productCategories.filter(func(_key, value) { value == category });
    let filteredProductIds = toProductIdsArray(filteredCategoryMap);

    filteredProductIds.map(
      func(id) {
        switch (products.get(id)) {
          case (null) { Runtime.trap("Product not found") };
          case (?product) { product };
        };
      }
    );
  };

  // Get featured products (public, no auth needed)
  public query ({ caller }) func getFeaturedProducts() : async [Product] {
    products.values().toArray().filter(func(x) { x.isFeatured });
  };

  // CART MANAGEMENT (authenticated users only)

  // Add item to cart (user only)
  public shared ({ caller }) func addToCart(productId : Nat) : async () {
    if (not (AccessControl.hasPermission(accessControlState, caller, #user))) {
      Runtime.trap("Unauthorized: Only users can add items to cart");
    };

    switch (products.get(productId)) {
      case (null) { Runtime.trap("Product does not exist") };
      case (_) {
        let cart = switch (carts.get(caller)) {
          case (null) { Set.empty<Nat>() };
          case (?existing) { existing };
        };
        cart.add(productId);
        carts.add(caller, cart);
      };
    };
  };

  // Remove item from cart (user only)
  public shared ({ caller }) func removeFromCart(productId : Nat) : async () {
    if (not (AccessControl.hasPermission(accessControlState, caller, #user))) {
      Runtime.trap("Unauthorized: Only users can remove items from cart");
    };

    let cart = switch (carts.get(caller)) {
      case (null) { Set.empty<Nat>() };
      case (?existing) { existing };
    };
    cart.remove(productId);
    carts.add(caller, cart);
  };

  // Get user's cart (user only)
  public query ({ caller }) func getCart() : async [Product] {
    if (not (AccessControl.hasPermission(accessControlState, caller, #user))) {
      Runtime.trap("Unauthorized: Only users can view their cart");
    };

    switch (carts.get(caller)) {
      case (null) { [] };
      case (?cart) {
        cart.toArray().filterMap(
          func(productId) {
            switch (products.get(productId)) {
              case (null) { Runtime.trap("Product not found") };
              case (?product) { ?product };
            }
          }
        );
      };
    };
  };

  // Clear user's cart (user only)
  public shared ({ caller }) func clearCart() : async () {
    if (not (AccessControl.hasPermission(accessControlState, caller, #user))) {
      Runtime.trap("Unauthorized: Only users can clear their cart");
    };

    carts.remove(caller);
  };

  // Utility module for comparing products by price
  module Product {
    public func compareByPrice(a : Product, b : Product) : Order.Order {
      Float.compare(a.price, b.price);
    };
  };

  // Get all products sorted by price (public, no auth needed)
  public query ({ caller }) func getProductsSortedByPrice() : async [Product] {
    products.values().toArray().sort(Product.compareByPrice);
  };

  // Find products by brand (public, no auth needed)
  public query ({ caller }) func getProductsByBrand(brand : Text) : async [Product] {
    products.values().toArray().filter(func(x) { x.brand == brand });
  };

  // CONTACT FORMS

  // Submit contact form (public, anyone including guests can submit)
  public shared ({ caller }) func submitContactForm(input : {
    name : Text;
    email : Text;
    phone : Text;
    message : Text;
  }) : async Nat {
    let id = contactIdCounter;
    let newContact : ContactMessage = {
      input with timestamp = Time.now();
      id;
    };

    contactMessages.add(id, newContact);
    contactIdCounter += 1;
    id;
  };

  // Get all contact messages (admin only)
  public query ({ caller }) func adminGetContactMessages() : async [ContactMessage] {
    if (not (AccessControl.hasPermission(accessControlState, caller, #admin))) {
      Runtime.trap("Unauthorized: Only admins can view contact messages");
    };

    contactMessages.values().toArray();
  };

  // BRANDS MANAGEMENT

  // Add product brand (admin only)
  public shared ({ caller }) func adminAddBrand(name : Text, logo : ?Storage.ExternalBlob) : async Nat {
    if (not (AccessControl.hasPermission(accessControlState, caller, #admin))) {
      Runtime.trap("Unauthorized: Only admins can add brand");
    };

    let id = brandIdCounter;
    let newBrand : Brand = {
      id;
      name;
      logo;
    };

    brands.add(id, newBrand);
    brandIdCounter += 1;
    id;
  };

  // Update brand (admin only)
  public shared ({ caller }) func adminUpdateBrand(id : Nat, name : Text, logo : ?Storage.ExternalBlob) : async () {
    if (not (AccessControl.hasPermission(accessControlState, caller, #admin))) {
      Runtime.trap("Unauthorized: Only admins can update brand");
    };

    if (not brands.containsKey(id)) {
      Runtime.trap("Brand not found");
    };

    let updatedBrand : Brand = {
      id;
      name;
      logo;
    };

    brands.add(id, updatedBrand);
  };

  // Delete brand (admin only)
  public shared ({ caller }) func adminDeleteBrand(id : Nat) : async () {
    if (not (AccessControl.hasPermission(accessControlState, caller, #admin))) {
      Runtime.trap("Unauthorized: Only admins can delete brand");
    };

    if (not brands.containsKey(id)) {
      Runtime.trap("Brand not found");
    };

    brands.remove(id);
  };

  // Get all brands (public, no auth needed)
  public query ({ caller }) func getAllBrands() : async [Brand] {
    brands.values().toArray();
  };

  // Get brand by ID (public, no auth needed)
  public query ({ caller }) func getBrandById(id : Nat) : async Brand {
    switch (brands.get(id)) {
      case (null) { Runtime.trap("Brand not found") };
      case (?brand) { brand };
    };
  };
};

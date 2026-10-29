import {
  Search,
  MapPin,
  Clock,
  Flame,
  TicketPercent,
  Star,
  TrendingUp,
  UtensilsCrossed,
  Coffee,
  Beef,
  IceCream2,
  Sandwich,
  Salad,
  ChefHat,
  ChevronRight,
  Timer,
  Heart,
  BadgePercent,
  ShoppingBag,
  Sparkles,
  Zap,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { ScrollArea, ScrollBar } from "@/components/ui/scroll-area";
import { formatTimeLeft } from "@/lib/format-time";
import { formatPrice } from "@/lib/format-price";
import { HeaderHome } from "@/components/home/header";

const HomePage = () => {
  //   const [activeTab, setActiveTab] = useState("all");
  //   const [cartCount, setCartCount] = useState(3);
  const cartCount = 3;

  // Mock data
  const flashSales = [
    {
      id: 1,
      name: "Ayam Geprek Premium",
      image: "/api/placeholder/150/150",
      originalPrice: 35000,
      discountedPrice: 15000,
      discount: 57,
      sold: 85,
      total: 100,
      rating: 4.8,
      restaurant: "Warung Mbak Sri",
      timeLeft: "02:45:30",
    },
    {
      id: 2,
      name: "Paket Nasi Padang",
      image: "/api/placeholder/150/150",
      originalPrice: 45000,
      discountedPrice: 19900,
      discount: 56,
      sold: 120,
      total: 150,
      rating: 4.9,
      restaurant: "RM Sederhana",
      timeLeft: "01:20:15",
    },
    {
      id: 3,
      name: "Pizza Margherita Large",
      image: "/api/placeholder/150/150",
      originalPrice: 89000,
      discountedPrice: 39900,
      discount: 55,
      sold: 45,
      total: 50,
      rating: 4.7,
      restaurant: "Italian Bistro",
      timeLeft: "03:10:00",
    },
    {
      id: 4,
      name: "Sushi Roll Combo",
      image: "/api/placeholder/150/150",
      originalPrice: 75000,
      discountedPrice: 35000,
      discount: 53,
      sold: 67,
      total: 80,
      rating: 4.6,
      restaurant: "Sakura Japanese",
      timeLeft: "00:45:20",
    },
  ];

  const categories = [
    { id: 1, name: "Semua", icon: UtensilsCrossed, color: "bg-blue-500" },
    { id: 2, name: "Diskon Besar", icon: BadgePercent, color: "bg-red-500" },
    { id: 3, name: "Terdekat", icon: MapPin, color: "bg-green-500" },
    { id: 4, name: "Terlaris", icon: TrendingUp, color: "bg-orange-500" },
    { id: 5, name: "Rating Tinggi", icon: Star, color: "bg-yellow-500" },
    { id: 6, name: "Makanan Cepat", icon: Zap, color: "bg-purple-500" },
  ];

  const recommendedRestaurants = [
    {
      id: 1,
      name: "Burger King - Grand Indonesia",
      image: "/api/placeholder/80/80",
      rating: 4.8,
      totalReviews: 2341,
      deliveryTime: "15-25 mnt",
      distance: "1.2 km",
      discount: "50%",
      tags: ["Fast Food", "Burger"],
    },
    {
      id: 2,
      name: "Sate Taichan Goreng",
      image: "/api/placeholder/80/80",
      rating: 4.9,
      totalReviews: 1823,
      deliveryTime: "20-30 mnt",
      distance: "0.8 km",
      discount: "30%",
      tags: ["Indonesian", "Satay"],
    },
    {
      id: 3,
      name: "Kopi Kenangan - Menteng",
      image: "/api/placeholder/80/80",
      rating: 4.7,
      totalReviews: 5678,
      deliveryTime: "10-20 mnt",
      distance: "0.5 km",
      discount: "Buy 1 Get 1",
      tags: ["Coffee", "Beverages"],
    },
  ];

  const foodCategories = [
    { id: 1, name: "Makanan Berat", icon: Beef, items: 234 },
    { id: 2, name: "Cemilan", icon: Sandwich, items: 156 },
    { id: 3, name: "Minuman", icon: Coffee, items: 189 },
    { id: 4, name: "Dessert", icon: IceCream2, items: 98 },
    { id: 5, name: "Sehat", icon: Salad, items: 67 },
    { id: 6, name: "Homemade", icon: ChefHat, items: 123 },
  ];

  const trendingFoods = [
    {
      id: 1,
      name: "Nasi Goreng Spesial",
      image: "/api/placeholder/120/120",
      restaurant: "Dapur Nusantara",
      price: 25000,
      originalPrice: 35000,
      rating: 4.8,
      soldToday: 234,
    },
    {
      id: 2,
      name: "Boba Milk Tea",
      image: "/api/placeholder/120/120",
      restaurant: "Xie Xie Boba",
      price: 18000,
      originalPrice: 28000,
      rating: 4.7,
      soldToday: 567,
    },
    {
      id: 3,
      name: "Beef Teriyaki Bowl",
      image: "/api/placeholder/120/120",
      restaurant: "Yoshinoya",
      price: 32000,
      originalPrice: 45000,
      rating: 4.6,
      soldToday: 189,
    },
  ];

  return (
    <div className="min-h-screen bg-slate-50">
      {/* Header */}
      <HeaderHome />

      {/* Main Content */}
      <main className="pb-20">
        {/* Hero Banner */}
        <section className="px-4 pt-4">
          <Card className="bg-linear-to-r from-primary via-primary/90 to-orange-500 text-primary-foreground border-0 shadow-lg">
            <CardContent className="p-5">
              <div className="flex items-center justify-between">
                <div className="space-y-2">
                  <div className="flex items-center gap-2">
                    <Sparkles className="h-5 w-5" />
                    <span className="text-xs font-semibold bg-white/20 px-2 py-1 rounded-full">
                      FLASH SALE
                    </span>
                  </div>
                  <h2 className="text-lg font-bold">Diskon Hingga 80%</h2>
                  <p className="text-sm text-white/80">
                    Jangan sampai kehabisan!
                  </p>
                  <Button
                    size="sm"
                    variant="secondary"
                    className="mt-2 font-medium"
                  >
                    Lihat Semua
                    <ChevronRight className="h-4 w-4 ml-1" />
                  </Button>
                </div>
                <div className="text-6xl">🎉</div>
              </div>
            </CardContent>
          </Card>
        </section>

        {/* Categories */}
        <section className="px-4 mt-6">
          <h3 className="text-base font-semibold text-slate-800 mb-3">
            Kategori
          </h3>
          <ScrollArea className="w-full whitespace-nowrap">
            <div className="flex space-x-3 pb-2">
              {categories.map((category) => (
                <button
                  key={category.id}
                  className="flex flex-col items-center gap-2 min-w-18"
                >
                  <div
                    className={`h-12 w-12 rounded-xl ${category.color} flex items-center justify-center shadow-sm`}
                  >
                    <category.icon className="h-6 w-6 text-white" />
                  </div>
                  <span className="text-xs font-medium text-slate-600 text-center">
                    {category.name}
                  </span>
                </button>
              ))}
            </div>
            <ScrollBar orientation="horizontal" />
          </ScrollArea>
        </section>

        {/* Flash Sale */}
        <section className="px-4 mt-6">
          <div className="flex items-center justify-between mb-3">
            <div className="flex items-center gap-2">
              <Flame className="h-5 w-5 text-red-500" />
              <h3 className="text-base font-semibold text-slate-800">
                Flash Sale
              </h3>
              <Badge variant="destructive" className="text-[10px] px-1.5 py-0">
                LIVE
              </Badge>
            </div>
            <button className="text-sm text-primary font-medium flex items-center gap-1 hover:text-primary/80 transition-colors">
              Lihat Semua
              <ChevronRight className="h-4 w-4" />
            </button>
          </div>

          <ScrollArea className="w-full whitespace-nowrap">
            <div className="flex space-x-3 pb-2">
              {flashSales.map((item) => {
                const { hours, minutes, seconds } = formatTimeLeft(
                  item.timeLeft,
                );
                return (
                  <Card
                    key={item.id}
                    className="min-w-62.5 sm:min-w-70 border-slate-200 hover:border-primary/30 transition-all hover:shadow-md cursor-pointer"
                  >
                    <CardContent className="p-3">
                      {/* Image */}
                      <div className="relative aspect-square rounded-lg overflow-hidden bg-slate-100 mb-3">
                        <img
                          src={item.image}
                          alt={item.name}
                          className="w-full h-full object-cover"
                        />
                        <div className="absolute top-2 left-2">
                          <Badge className="bg-red-500 hover:bg-red-600 text-white border-0 text-xs font-bold">
                            {item.discount}% OFF
                          </Badge>
                        </div>
                        <button className="absolute top-2 right-2 p-1.5 bg-white/90 hover:bg-white rounded-full transition-colors">
                          <Heart className="h-3.5 w-3.5 text-slate-600" />
                        </button>
                      </div>

                      {/* Info */}
                      <div className="space-y-2">
                        <h4 className="font-semibold text-sm text-slate-800 line-clamp-2">
                          {item.name}
                        </h4>
                        <p className="text-xs text-slate-500">
                          {item.restaurant}
                        </p>

                        {/* Price */}
                        <div className="flex items-baseline gap-1.5">
                          <span className="text-sm font-bold text-red-600">
                            {formatPrice(item.discountedPrice)}
                          </span>
                          <span className="text-xs text-slate-400 line-through">
                            {formatPrice(item.originalPrice)}
                          </span>
                        </div>

                        {/* Timer */}
                        <div className="flex items-center justify-between">
                          <div className="flex items-center gap-1 text-xs">
                            <Timer className="h-3 w-3 text-red-500" />
                            <div className="flex items-center gap-0.5 font-mono font-bold text-red-600">
                              <span className="bg-red-50 px-1 rounded">
                                {hours}
                              </span>
                              <span>:</span>
                              <span className="bg-red-50 px-1 rounded">
                                {minutes}
                              </span>
                              <span>:</span>
                              <span className="bg-red-50 px-1 rounded">
                                {seconds}
                              </span>
                            </div>
                          </div>
                          <div className="flex items-center gap-1 text-xs text-slate-500">
                            <Star className="h-3 w-3 text-yellow-500 fill-yellow-500" />
                            {item.rating}
                          </div>
                        </div>

                        {/* Progress */}
                        <div className="space-y-1">
                          <div className="w-full h-1.5 bg-slate-100 rounded-full overflow-hidden">
                            <div
                              className="h-full bg-red-500 rounded-full"
                              style={{
                                width: `${(item.sold / item.total) * 100}%`,
                              }}
                            />
                          </div>
                          <p className="text-[10px] text-slate-400">
                            {item.sold} terjual
                          </p>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                );
              })}
            </div>
            <ScrollBar orientation="horizontal" />
          </ScrollArea>
        </section>

        {/* Food Categories Grid */}
        <section className="px-4 mt-6">
          <h3 className="text-base font-semibold text-slate-800 mb-3">
            Jenis Makanan
          </h3>
          <div className="grid grid-cols-3 gap-3">
            {foodCategories.map((category) => (
              <Card
                key={category.id}
                className="border-slate-200 hover:border-primary/30 transition-all hover:shadow-md cursor-pointer"
              >
                <CardContent className="p-4 flex flex-col items-center text-center space-y-2">
                  <div className="h-10 w-10 rounded-full bg-orange-50 flex items-center justify-center">
                    <category.icon className="h-5 w-5 text-orange-600" />
                  </div>
                  <div>
                    <p className="text-xs font-medium text-slate-700">
                      {category.name}
                    </p>
                    <p className="text-[10px] text-slate-400">
                      {category.items} items
                    </p>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </section>

        {/* Recommended Restaurants */}
        <section className="px-4 mt-6">
          <div className="flex items-center justify-between mb-3">
            <div className="flex items-center gap-2">
              <Star className="h-5 w-5 text-yellow-500 fill-yellow-500" />
              <h3 className="text-base font-semibold text-slate-800">
                Rekomendasi Restoran
              </h3>
            </div>
            <button className="text-sm text-primary font-medium flex items-center gap-1 hover:text-primary/80 transition-colors">
              Lihat Semua
              <ChevronRight className="h-4 w-4" />
            </button>
          </div>

          <div className="space-y-3">
            {recommendedRestaurants.map((restaurant) => (
              <Card
                key={restaurant.id}
                className="border-slate-200 hover:border-primary/30 transition-all hover:shadow-md cursor-pointer"
              >
                <CardContent className="p-4">
                  <div className="flex gap-3">
                    <Avatar className="h-16 w-16 rounded-xl">
                      <AvatarImage src={restaurant.image} />
                      <AvatarFallback className="rounded-xl bg-slate-100">
                        <UtensilsCrossed className="h-6 w-6 text-slate-400" />
                      </AvatarFallback>
                    </Avatar>

                    <div className="flex-1 min-w-0">
                      <h4 className="font-semibold text-sm text-slate-800 mb-1">
                        {restaurant.name}
                      </h4>
                      <div className="flex items-center gap-2 mb-2">
                        <div className="flex items-center gap-1">
                          <Star className="h-3.5 w-3.5 text-yellow-500 fill-yellow-500" />
                          <span className="text-xs font-medium text-slate-700">
                            {restaurant.rating}
                          </span>
                          <span className="text-xs text-slate-400">
                            ({restaurant.totalReviews.toLocaleString()})
                          </span>
                        </div>
                      </div>
                      <div className="flex items-center gap-3 text-xs text-slate-500">
                        <span className="flex items-center gap-1">
                          <Clock className="h-3 w-3" />
                          {restaurant.deliveryTime}
                        </span>
                        <span className="flex items-center gap-1">
                          <MapPin className="h-3 w-3" />
                          {restaurant.distance}
                        </span>
                      </div>
                      <div className="flex items-center gap-1.5 mt-2">
                        <Badge
                          variant="secondary"
                          className="text-[10px] bg-green-50 text-green-700 border-green-200"
                        >
                          <TicketPercent className="h-3 w-3 mr-0.5" />
                          {restaurant.discount}
                        </Badge>
                        {restaurant.tags.map((tag, idx) => (
                          <Badge
                            key={idx}
                            variant="outline"
                            className="text-[10px]"
                          >
                            {tag}
                          </Badge>
                        ))}
                      </div>
                    </div>

                    <ChevronRight className="h-5 w-5 text-slate-400 self-center shrink-0" />
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </section>

        {/* Trending Foods */}
        <section className="px-4 mt-6">
          <div className="flex items-center justify-between mb-3">
            <div className="flex items-center gap-2">
              <TrendingUp className="h-5 w-5 text-blue-500" />
              <h3 className="text-base font-semibold text-slate-800">
                Trending Minggu Ini
              </h3>
            </div>
            <button className="text-sm text-primary font-medium flex items-center gap-1 hover:text-primary/80 transition-colors">
              Lihat Semua
              <ChevronRight className="h-4 w-4" />
            </button>
          </div>

          <ScrollArea className="w-full whitespace-nowrap">
            <div className="flex space-x-3 pb-2">
              {trendingFoods.map((food) => (
                <Card
                  key={food.id}
                  className="min-w-40 border-slate-200 hover:border-primary/30 transition-all hover:shadow-md cursor-pointer"
                >
                  <CardContent className="p-3">
                    <div className="relative aspect-square rounded-lg overflow-hidden bg-slate-100 mb-2">
                      <img
                        src={food.image}
                        alt={food.name}
                        className="w-full h-full object-cover"
                      />
                      <div className="absolute bottom-2 left-2">
                        <Badge className="bg-orange-500 hover:bg-orange-600 text-white border-0 text-[10px]">
                          <Flame className="h-3 w-3 mr-0.5" />
                          {food.soldToday} terjual
                        </Badge>
                      </div>
                    </div>
                    <div className="space-y-1">
                      <h4 className="font-semibold text-xs text-slate-800 line-clamp-2">
                        {food.name}
                      </h4>
                      <p className="text-[10px] text-slate-500">
                        {food.restaurant}
                      </p>
                      <div className="flex items-center gap-1">
                        <Star className="h-3 w-3 text-yellow-500 fill-yellow-500" />
                        <span className="text-[10px] font-medium text-slate-600">
                          {food.rating}
                        </span>
                      </div>
                      <div className="flex items-baseline gap-1">
                        <span className="text-xs font-bold text-primary">
                          {formatPrice(food.price)}
                        </span>
                        <span className="text-[10px] text-slate-400 line-through">
                          {formatPrice(food.originalPrice)}
                        </span>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
            <ScrollBar orientation="horizontal" />
          </ScrollArea>
        </section>
      </main>

      {/* Bottom Navigation */}
      <nav className="fixed bottom-0 left-0 right-0 bg-white border-t border-slate-200 z-50">
        <div className="grid grid-cols-5 gap-1 px-2 py-2">
          <button className="flex flex-col items-center gap-1 p-1 text-primary">
            <UtensilsCrossed className="h-5 w-5" />
            <span className="text-[10px] font-medium">Home</span>
          </button>
          <button className="flex flex-col items-center gap-1 p-1 text-slate-400 hover:text-slate-600 transition-colors">
            <Search className="h-5 w-5" />
            <span className="text-[10px] font-medium">Cari</span>
          </button>
          <button className="flex flex-col items-center gap-1 p-1 text-slate-400 hover:text-slate-600 transition-colors">
            <TicketPercent className="h-5 w-5" />
            <span className="text-[10px] font-medium">Promo</span>
          </button>
          <button className="flex flex-col items-center gap-1 p-1 text-slate-400 hover:text-slate-600 transition-colors relative">
            <ShoppingBag className="h-5 w-5" />
            {cartCount > 0 && (
              <span className="absolute top-0 right-1 h-4 w-4 bg-primary text-primary-foreground text-[8px] font-bold rounded-full flex items-center justify-center">
                {cartCount}
              </span>
            )}
            <span className="text-[10px] font-medium">Pesanan</span>
          </button>
          <button className="flex flex-col items-center gap-1 p-1 text-slate-400 hover:text-slate-600 transition-colors">
            <Avatar className="h-5 w-5">
              <AvatarFallback className="text-[8px] bg-slate-200 text-slate-600">
                U
              </AvatarFallback>
            </Avatar>
            <span className="text-[10px] font-medium">Profil</span>
          </button>
        </div>
      </nav>
    </div>
  );
};

export default HomePage;

import { useState, useEffect, useRef } from "react";
import {
  MapPin,
  Search,
  Navigation,
  Crosshair,
  Plus,
  Home,
  Briefcase,
  Heart,
  Star,
  Clock,
  MoreVertical,
  Edit3,
  Trash2,
  ArrowLeft,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

// Leaflet imports dengan konfigurasi icon yang benar
import {
  MapContainer,
  TileLayer,
  Marker,
  useMapEvents,
  useMap,
} from "react-leaflet";
import L from "leaflet";

// Fix default marker icon untuk Leaflet
import "leaflet/dist/leaflet.css";

// Fix untuk default icon Leaflet
delete L.Icon.Default.prototype._getIconUrl;
L.Icon.Default.mergeOptions({
  iconRetinaUrl:
    "https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon-2x.png",
  iconUrl:
    "https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon.png",
  shadowUrl:
    "https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-shadow.png",
});

// Custom icons
const currentLocationIcon = new L.Icon({
  iconUrl:
    "https://raw.githubusercontent.com/pointhi/leaflet-color-markers/master/img/marker-icon-2x-blue.png",
  shadowUrl:
    "https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-shadow.png",
  iconSize: [25, 41],
  iconAnchor: [12, 41],
  popupAnchor: [1, -34],
  shadowSize: [41, 41],
});

const savedLocationIcon = new L.Icon({
  iconUrl:
    "https://raw.githubusercontent.com/pointhi/leaflet-color-markers/master/img/marker-icon-2x-green.png",
  shadowUrl:
    "https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-shadow.png",
  iconSize: [25, 41],
  iconAnchor: [12, 41],
  popupAnchor: [1, -34],
  shadowSize: [41, 41],
});

const LocationPage = () => {
  const [currentLocation, setCurrentLocation] = useState(null);
  const [selectedLocation, setSelectedLocation] = useState(null);
  const [savedAddresses, setSavedAddresses] = useState([
    {
      id: 1,
      name: "Rumah",
      address: "Jl. Sudirman No. 123, Jakarta Pusat",
      detail: "Apartemen Sudirman Tower A, Lantai 15",
      lat: -6.2088,
      lng: 106.8456,
      type: "home",
      isDefault: true,
      lastUsed: "2024-01-15",
    },
    {
      id: 2,
      name: "Kantor",
      address: "Jl. Thamrin No. 45, Jakarta Pusat",
      detail: "Gedung Thamrin, Lantai 20, Suite 2001",
      lat: -6.1888,
      lng: 106.8236,
      type: "office",
      isDefault: false,
      lastUsed: "2024-01-14",
    },
    {
      id: 3,
      name: "Rumah Orang Tua",
      address: "Jl. Kebon Jeruk No. 78, Jakarta Barat",
      detail: "Perumahan Green Garden, Blok B No. 12",
      lat: -6.1958,
      lng: 106.7736,
      type: "other",
      isDefault: false,
      lastUsed: "2024-01-10",
    },
  ]);
  const [searchQuery, setSearchQuery] = useState("");
  const [searchResults, setSearchResults] = useState([]);
  const [showAddDialog, setShowAddDialog] = useState(false);
  const [showEditDialog, setShowEditDialog] = useState(false);
  const [editingAddress, setEditingAddress] = useState(null);
  const [newAddress, setNewAddress] = useState({
    name: "",
    address: "",
    detail: "",
    lat: 0,
    lng: 0,
    type: "home",
    isDefault: false,
  });
  const [mapCenter, setMapCenter] = useState([-6.2088, 106.8456]);
  const [gpsActive, setGpsActive] = useState(false);
  const mapRef = useRef(null);

  // Get current location
  const getCurrentLocation = () => {
    if (navigator.geolocation) {
      setGpsActive(true);
      navigator.geolocation.getCurrentPosition(
        (position) => {
          const { latitude, longitude } = position.coords;
          setCurrentLocation({ lat: latitude, lng: longitude });
          setMapCenter([latitude, longitude]);
          setGpsActive(false);
        },
        (error) => {
          console.error("Error getting location:", error);
          setGpsActive(false);
        },
        {
          enableHighAccuracy: true,
          timeout: 10000,
          maximumAge: 0,
        },
      );
    }
  };

  // Simulate search address
  const handleSearch = (query) => {
    setSearchQuery(query);
    if (query.length > 2) {
      // Simulated search results
      const mockResults = [
        {
          id: 1,
          name: "Jl. Sudirman No. 100",
          address: "Jakarta Pusat, DKI Jakarta",
          lat: -6.2088,
          lng: 106.8456,
        },
        {
          id: 2,
          name: "Jl. Thamrin No. 50",
          address: "Jakarta Pusat, DKI Jakarta",
          lat: -6.1888,
          lng: 106.8236,
        },
        {
          id: 3,
          name: "Jl. Gatot Subroto No. 75",
          address: "Jakarta Selatan, DKI Jakarta",
          lat: -6.2288,
          lng: 106.8156,
        },
      ];
      setSearchResults(mockResults);
    } else {
      setSearchResults([]);
    }
  };

  // Select location from search
  const selectSearchLocation = (location) => {
    setSelectedLocation(location);
    setMapCenter([location.lat, location.lng]);
    setNewAddress({
      ...newAddress,
      address: `${location.name}, ${location.address}`,
      lat: location.lat,
      lng: location.lng,
    });
  };

  // Handle map click
  const MapClickHandler = () => {
    useMapEvents({
      click(e) {
        const { lat, lng } = e.latlng;
        setSelectedLocation({ lat, lng });
        setNewAddress({
          ...newAddress,
          lat,
          lng,
        });
      },
    });
    return null;
  };

  // Handle save new address
  const handleSaveAddress = () => {
    const newId = savedAddresses.length + 1;
    setSavedAddresses([
      ...savedAddresses,
      {
        id: newId,
        ...newAddress,
        lastUsed: new Date().toISOString().split("T")[0],
      },
    ]);
    setShowAddDialog(false);
    resetNewAddress();
  };

  // Handle edit address
  const handleEditAddress = (address) => {
    setEditingAddress(address);
    setNewAddress({
      name: address.name,
      address: address.address,
      detail: address.detail,
      lat: address.lat,
      lng: address.lng,
      type: address.type,
      isDefault: address.isDefault,
    });
    setShowEditDialog(true);
  };

  // Handle update address
  const handleUpdateAddress = () => {
    const updatedAddresses = savedAddresses.map((addr) =>
      addr.id === editingAddress.id
        ? {
            ...addr,
            name: newAddress.name,
            address: newAddress.address,
            detail: newAddress.detail,
            lat: newAddress.lat,
            lng: newAddress.lng,
            type: newAddress.type,
            isDefault: newAddress.isDefault,
          }
        : addr,
    );
    setSavedAddresses(updatedAddresses);
    setShowEditDialog(false);
    resetNewAddress();
  };

  // Handle delete address
  const handleDeleteAddress = (id) => {
    setSavedAddresses(savedAddresses.filter((addr) => addr.id !== id));
  };

  // Set as default address
  const setAsDefault = (id) => {
    setSavedAddresses(
      savedAddresses.map((addr) => ({
        ...addr,
        isDefault: addr.id === id,
      })),
    );
  };

  const resetNewAddress = () => {
    setNewAddress({
      name: "",
      address: "",
      detail: "",
      lat: 0,
      lng: 0,
      type: "home",
      isDefault: false,
    });
    setSelectedLocation(null);
    setEditingAddress(null);
  };

  const getTypeIcon = (type) => {
    switch (type) {
      case "home":
        return <Home className="h-4 w-4" />;
      case "office":
        return <Briefcase className="h-4 w-4" />;
      default:
        return <Heart className="h-4 w-4" />;
    }
  };

  const getTypeColor = (type) => {
    switch (type) {
      case "home":
        return "bg-blue-100 text-blue-600";
      case "office":
        return "bg-purple-100 text-purple-600";
      default:
        return "bg-pink-100 text-pink-600";
    }
  };

  // Update map center handler
  const MapCenterUpdater = ({ center }) => {
    const map = useMap();
    useEffect(() => {
      map.setView(center);
    }, [center, map]);
    return null;
  };

  return (
    <div className="min-h-screen bg-slate-50">
      {/* Header */}
      <header className="sticky top-0 z-50 bg-white border-b border-slate-200">
        <div className="px-4 py-3">
          <div className="flex items-center gap-3">
            <button className="p-2 hover:bg-slate-100 rounded-lg transition-colors -ml-2">
              <ArrowLeft className="h-5 w-5 text-slate-600" />
            </button>
            <div className="flex-1">
              <h1 className="text-lg font-semibold text-slate-800">
                Atur Lokasi
              </h1>
              <p className="text-xs text-slate-500">
                Pilih alamat pengiriman Anda
              </p>
            </div>
          </div>
        </div>
      </header>

      {/* Map Section */}
      <div className="relative h-[300px] sm:h-[400px] bg-slate-200">
        <MapContainer
          center={mapCenter}
          zoom={15}
          scrollWheelZoom={true}
          style={{ height: "100%", width: "100%" }}
          ref={mapRef}
        >
          <TileLayer
            attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
            url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          />
          <MapCenterUpdater center={mapCenter} />
          <MapClickHandler />

          {/* Current Location Marker */}
          {currentLocation && (
            <Marker
              position={[currentLocation.lat, currentLocation.lng]}
              icon={currentLocationIcon}
            />
          )}

          {/* Saved Addresses Markers */}
          {savedAddresses.map((address) => (
            <Marker
              key={address.id}
              position={[address.lat, address.lng]}
              icon={savedLocationIcon}
            />
          ))}

          {/* Selected Location Marker */}
          {selectedLocation && (
            <Marker position={[selectedLocation.lat, selectedLocation.lng]} />
          )}
        </MapContainer>

        {/* GPS Button */}
        <Button
          size="icon"
          className="absolute top-4 right-4 shadow-lg bg-white hover:bg-slate-50 text-slate-700"
          onClick={getCurrentLocation}
          disabled={gpsActive}
        >
          <Crosshair
            className={`h-4 w-4 ${gpsActive ? "animate-pulse text-blue-500" : ""}`}
          />
        </Button>

        {/* Search Overlay */}
        <div className="absolute top-4 left-4 right-16">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-slate-400" />
            <Input
              placeholder="Cari lokasi..."
              className="pl-9 pr-4 bg-white shadow-lg border-slate-200"
              value={searchQuery}
              onChange={(e) => handleSearch(e.target.value)}
            />
          </div>

          {/* Search Results */}
          {searchResults.length > 0 && searchQuery.length > 2 && (
            <Card className="mt-2 shadow-lg border-slate-200">
              <CardContent className="p-2">
                {searchResults.map((result) => (
                  <button
                    key={result.id}
                    className="w-full flex items-start gap-3 p-3 hover:bg-slate-50 rounded-lg transition-colors text-left"
                    onClick={() => selectSearchLocation(result)}
                  >
                    <MapPin className="h-4 w-4 text-slate-400 mt-0.5 shrink-0" />
                    <div>
                      <p className="text-sm font-medium text-slate-700">
                        {result.name}
                      </p>
                      <p className="text-xs text-slate-500">{result.address}</p>
                    </div>
                  </button>
                ))}
              </CardContent>
            </Card>
          )}
        </div>
      </div>

      {/* Current Location Button */}
      {currentLocation && (
        <div className="px-4 py-3 bg-white border-b border-slate-100">
          <Button
            variant="outline"
            className="w-full text-slate-700 border-blue-200 hover:bg-blue-50"
            onClick={() => {
              setSelectedLocation(currentLocation);
              setNewAddress({
                ...newAddress,
                lat: currentLocation.lat,
                lng: currentLocation.lng,
              });
              setShowAddDialog(true);
            }}
          >
            <Navigation className="h-4 w-4 mr-2 text-blue-500" />
            Gunakan Lokasi Saya Saat Ini
          </Button>
        </div>
      )}

      {/* Saved Addresses */}
      <div className="px-4 py-4">
        <div className="flex items-center justify-between mb-3">
          <h3 className="text-base font-semibold text-slate-800">
            Alamat Tersimpan
          </h3>
          <Dialog open={showAddDialog} onOpenChange={setShowAddDialog}>
            <DialogTrigger asChild>
              <Button
                size="sm"
                variant="outline"
                className="text-primary border-primary/30 hover:bg-primary/5"
              >
                <Plus className="h-4 w-4 mr-1" />
                Tambah
              </Button>
            </DialogTrigger>
            <DialogContent className="sm:max-w-md">
              <DialogHeader>
                <DialogTitle>Tambah Alamat Baru</DialogTitle>
                <DialogDescription>
                  Lengkapi detail alamat untuk memudahkan pengiriman
                </DialogDescription>
              </DialogHeader>
              <div className="space-y-4 py-4">
                <div className="space-y-2">
                  <Label>Nama Lokasi</Label>
                  <Input
                    placeholder="Rumah, Kantor, dll"
                    value={newAddress.name}
                    onChange={(e) =>
                      setNewAddress({ ...newAddress, name: e.target.value })
                    }
                  />
                </div>
                <div className="space-y-2">
                  <Label>Tipe</Label>
                  <Select
                    value={newAddress.type}
                    onValueChange={(value) =>
                      setNewAddress({ ...newAddress, type: value })
                    }
                  >
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="home">
                        <div className="flex items-center gap-2">
                          <Home className="h-4 w-4" />
                          Rumah
                        </div>
                      </SelectItem>
                      <SelectItem value="office">
                        <div className="flex items-center gap-2">
                          <Briefcase className="h-4 w-4" />
                          Kantor
                        </div>
                      </SelectItem>
                      <SelectItem value="other">
                        <div className="flex items-center gap-2">
                          <Heart className="h-4 w-4" />
                          Lainnya
                        </div>
                      </SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div className="space-y-2">
                  <Label>Alamat Lengkap</Label>
                  <Textarea
                    placeholder="Masukkan alamat lengkap"
                    value={newAddress.address}
                    onChange={(e) =>
                      setNewAddress({ ...newAddress, address: e.target.value })
                    }
                    className="resize-none"
                  />
                </div>
                <div className="space-y-2">
                  <Label>Detail Tambahan</Label>
                  <Input
                    placeholder="No. Unit, Lantai, Patokan, dll"
                    value={newAddress.detail}
                    onChange={(e) =>
                      setNewAddress({ ...newAddress, detail: e.target.value })
                    }
                  />
                </div>
                <div className="flex items-center justify-between">
                  <div className="space-y-1">
                    <Label>Koordinat</Label>
                    <p className="text-xs text-slate-500">
                      {selectedLocation
                        ? `${selectedLocation.lat.toFixed(6)}, ${selectedLocation.lng.toFixed(6)}`
                        : "Belum dipilih"}
                    </p>
                  </div>
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => setShowAddDialog(false)}
                  >
                    Pilih di Peta
                  </Button>
                </div>
                <div className="flex items-center space-x-2">
                  <Switch
                    checked={newAddress.isDefault}
                    onCheckedChange={(checked) =>
                      setNewAddress({ ...newAddress, isDefault: checked })
                    }
                  />
                  <Label>Jadikan alamat utama</Label>
                </div>
              </div>
              <DialogFooter>
                <Button
                  variant="outline"
                  onClick={() => setShowAddDialog(false)}
                >
                  Batal
                </Button>
                <Button onClick={handleSaveAddress}>Simpan</Button>
              </DialogFooter>
            </DialogContent>
          </Dialog>
        </div>

        <div className="space-y-3">
          {savedAddresses.map((address) => (
            <Card
              key={address.id}
              className={`border-2 transition-colors ${
                address.isDefault
                  ? "border-primary/30 bg-primary/5"
                  : "border-slate-200 hover:border-primary/20"
              }`}
            >
              <CardContent className="p-4">
                <div className="flex items-start gap-3">
                  <div
                    className={`p-2 rounded-lg ${getTypeColor(address.type)}`}
                  >
                    {getTypeIcon(address.type)}
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="flex items-start justify-between">
                      <div>
                        <div className="flex items-center gap-2">
                          <h4 className="font-semibold text-sm text-slate-800">
                            {address.name}
                          </h4>
                          {address.isDefault && (
                            <Badge className="text-[10px] bg-primary/10 text-primary border-primary/20">
                              Utama
                            </Badge>
                          )}
                        </div>
                        <p className="text-sm text-slate-600 mt-1">
                          {address.address}
                        </p>
                        {address.detail && (
                          <p className="text-xs text-slate-500 mt-0.5">
                            {address.detail}
                          </p>
                        )}
                      </div>
                      <Sheet>
                        <SheetTrigger asChild>
                          <button className="p-1 hover:bg-slate-100 rounded-lg transition-colors">
                            <MoreVertical className="h-4 w-4 text-slate-400" />
                          </button>
                        </SheetTrigger>
                        <SheetContent side="bottom" className="rounded-t-2xl">
                          <SheetHeader className="text-left">
                            <SheetTitle>{address.name}</SheetTitle>
                            <SheetDescription>
                              {address.address}
                            </SheetDescription>
                          </SheetHeader>
                          <div className="space-y-2 py-4">
                            <Button
                              variant="ghost"
                              className="w-full justify-start"
                              onClick={() => setAsDefault(address.id)}
                            >
                              <Star className="h-4 w-4 mr-2" />
                              Jadikan Alamat Utama
                            </Button>
                            <Button
                              variant="ghost"
                              className="w-full justify-start"
                              onClick={() => handleEditAddress(address)}
                            >
                              <Edit3 className="h-4 w-4 mr-2" />
                              Edit Alamat
                            </Button>
                            <Button
                              variant="ghost"
                              className="w-full justify-start text-red-600 hover:text-red-700 hover:bg-red-50"
                              onClick={() => handleDeleteAddress(address.id)}
                            >
                              <Trash2 className="h-4 w-4 mr-2" />
                              Hapus Alamat
                            </Button>
                          </div>
                        </SheetContent>
                      </Sheet>
                    </div>
                    <div className="flex items-center gap-2 mt-2">
                      <Badge variant="outline" className="text-[10px]">
                        <MapPin className="h-3 w-3 mr-1" />
                        {address.lat.toFixed(4)}, {address.lng.toFixed(4)}
                      </Badge>
                      <span className="text-[10px] text-slate-400 flex items-center gap-1">
                        <Clock className="h-3 w-3" />
                        Terakhir: {address.lastUsed}
                      </span>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>

      {/* Edit Dialog */}
      <Dialog open={showEditDialog} onOpenChange={setShowEditDialog}>
        <DialogContent className="sm:max-w-md">
          <DialogHeader>
            <DialogTitle>Edit Alamat</DialogTitle>
            <DialogDescription>Perbarui detail alamat Anda</DialogDescription>
          </DialogHeader>
          <div className="space-y-4 py-4">
            <div className="space-y-2">
              <Label>Nama Lokasi</Label>
              <Input
                value={newAddress.name}
                onChange={(e) =>
                  setNewAddress({ ...newAddress, name: e.target.value })
                }
              />
            </div>
            <div className="space-y-2">
              <Label>Tipe</Label>
              <Select
                value={newAddress.type}
                onValueChange={(value) =>
                  setNewAddress({ ...newAddress, type: value })
                }
              >
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="home">
                    <div className="flex items-center gap-2">
                      <Home className="h-4 w-4" />
                      Rumah
                    </div>
                  </SelectItem>
                  <SelectItem value="office">
                    <div className="flex items-center gap-2">
                      <Briefcase className="h-4 w-4" />
                      Kantor
                    </div>
                  </SelectItem>
                  <SelectItem value="other">
                    <div className="flex items-center gap-2">
                      <Heart className="h-4 w-4" />
                      Lainnya
                    </div>
                  </SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div className="space-y-2">
              <Label>Alamat Lengkap</Label>
              <Textarea
                value={newAddress.address}
                onChange={(e) =>
                  setNewAddress({ ...newAddress, address: e.target.value })
                }
                className="resize-none"
              />
            </div>
            <div className="space-y-2">
              <Label>Detail Tambahan</Label>
              <Input
                value={newAddress.detail}
                onChange={(e) =>
                  setNewAddress({ ...newAddress, detail: e.target.value })
                }
              />
            </div>
            <div className="flex items-center space-x-2">
              <Switch
                checked={newAddress.isDefault}
                onCheckedChange={(checked) =>
                  setNewAddress({ ...newAddress, isDefault: checked })
                }
              />
              <Label>Jadikan alamat utama</Label>
            </div>
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={() => setShowEditDialog(false)}>
              Batal
            </Button>
            <Button onClick={handleUpdateAddress}>Simpan</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default LocationPage;

package ws

type Room struct {
	ID      string             `json:"id"`
	Name    string             `json:"name"`
	Clients map[string]*Client `json:"clients"`
}

type Hub struct {
	Rooms      map[string]*Room
	Register   chan *Client
	Unregister chan *Client
	Broadcast  chan *Message
}

func NewHub() *Hub {
	return &Hub{
		Rooms:      make(map[string]*Room),
		Register:   make(chan *Client),
		Unregister: make(chan *Client),
		Broadcast:  make(chan *Message, 5),
	}
}

func (h *Hub) Run() {
	for {
		select {
		case client := <-h.Register:
			_, ok := h.Rooms[client.RoomID]
			if ok {
				room := h.Rooms[client.RoomID]

				_, ok := room.Clients[client.ID]
				if !ok {
					room.Clients[client.ID] = client
				}
			}
		case client := <-h.Unregister:
			_, ok := h.Rooms[client.RoomID]
			if ok {
				room := h.Rooms[client.RoomID]

				_, ok := room.Clients[client.ID]
				if ok {
					if len(h.Rooms[client.RoomID].Clients) != 0 {
						h.Broadcast <- &Message{
							Content:  "user left the chat",
							RoomID:   client.RoomID,
							Username: client.Username,
						}
					}

					delete(h.Rooms[client.RoomID].Clients, client.ID)
					close(client.Message)
				}
			}
		case message := <-h.Broadcast:
			_, ok := h.Rooms[message.RoomID]
			if ok {
				for _, client := range h.Rooms[message.RoomID].Clients {
					client.Message <- message
				}
			}
		}
	}
}

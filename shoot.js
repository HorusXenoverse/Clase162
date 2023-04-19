AFRAME.registerComponent("bullets", {
  init: function () {
    this.shootBullet();
  },
  shootBullet: function () {
    window.addEventListener("keydown", (e) => {
      if (e.key === "z") {
        var bullet = document.createElement("a-entity");

        bullet.setAttribute("geometry", {
          primitive: "sphere",
          radius: 0.1,
        });

        bullet.setAttribute("material", "color", "black");

        var cam = document.querySelector("#camera");

        pos = cam.getAttribute("position");

        bullet.setAttribute("position", {
          x: pos.x,
          y: pos.y,
          z: pos.z,
        });

        var camera = document.querySelector("#camera").object3D;

        // Obtener la dirección de la cámara como un vector de Three.js
        var direction = new THREE.Vector3();
        camera.getWorldDirection(direction);

        // Establecer la velocidad y su dirección
        bullet.setAttribute("velocity", direction.multiplyScalar(-10));

        // Establecer a la bala como un dynamic-body
        bullet.setAttribute("dynamic-body" ,{shape: "sphere", mass: "0"})

        var scene = document.querySelector("#scene");

        // Escucha de eventos
        bullet.addEventListener("collide", this.removeBullet )

        scene.appendChild(bullet);
      }
    });
  },

  removeBullet: function (e) {
    // Entidad original (bala)
    console.log(e.detail.target.el);

    // Otra entidad que la bala toque
    console.log(e.detail.body.el);

    // Elemento de la bala
    var bulletElement = e.detail.target.el

    // Elemento que es golpeado
    var elementHit = e.detail.body.el
 

    if (elementHit.id.includes("box")) 
      {
        // Establecer el atributo "material"
        elementHit.setAttribute("material", {opacity: 1, transparent: true})
        

        // Impulso y vector punto
        var impulso = new CANNON.Vec3(-2, 2, 1)
        var point = new CANNON.Vec3().copy(elementHit.getAttribute("position"))
        elementHit.body.applyImpulse(impulso, point)
        

        // Eliminar escucha de evento
        bulletElement.removeEventListener("collide", this.shoot)
        
        
        // Remover las balas de la escena
        var sceneRemove = document.querySelector("#scene")
        sceneRemove.removeChild(bulletElement)
      
    }
  },
});


